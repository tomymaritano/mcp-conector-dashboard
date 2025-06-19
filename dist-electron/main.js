import { app, BrowserWindow, ipcMain } from "electron";
import path, { dirname } from "path";
import fs from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let win;
const processes = {};
const configPath = path.join(__dirname, "..", "mcp.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
app.whenReady().then(() => {
  win = new BrowserWindow({
    title: "Inkrun MCP Manager",
    width: 1e3,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
      // También usa __dirname aquí
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
  win.webContents.openDevTools();
});
ipcMain.handle("start-mcp", (_event, name) => {
  const def = config.mcpServers[name];
  if (!def || processes[name]) return;
  const child = spawn(def.command, def.args, { shell: true });
  processes[name] = child;
  win.webContents.send("mcp-status", { name, status: "starting" });
  child.stdout.on("data", (data) => {
    console.log(`[${name}] ${data}`);
    win.webContents.send("mcp-status", { name, status: "online" });
  });
  child.stderr.on("data", (data) => {
    console.error(`[${name} error] ${data}`);
    win.webContents.send("mcp-status", { name, status: "error" });
  });
  child.on("exit", () => {
    delete processes[name];
    win.webContents.send("mcp-status", { name, status: "offline" });
  });
});
ipcMain.handle("stop-mcp", (_event, name) => {
  if (processes[name]) {
    processes[name].kill();
    delete processes[name];
    win.webContents.send("mcp-status", { name, status: "offline" });
  }
  ipcMain.handle("mcp:prompt", async (_event2, prompt) => {
    const proc = processes["memory"];
    if (!proc) return "❌ MCP memory no está corriendo.";
    return new Promise((resolve) => {
      let output = "";
      const onData = (data) => {
        output += data.toString();
        if (output.trim().endsWith("\n") || output.includes("\n")) {
          proc.stdout.off("data", onData);
          resolve(output.trim());
        }
      };
      proc.stdout.on("data", onData);
      proc.stdin.write(`${prompt}
`);
    });
  });
});
ipcMain.handle("send-to-mcp", async (_event, { name, prompt }) => {
  const proc = processes[name];
  if (!proc) return `❌ MCP "${name}" no está corriendo.`;
  return new Promise((resolve) => {
    let output = "";
    const onData = (data) => {
      output += data.toString();
      if (output.trim().endsWith("\n") || output.includes("\n")) {
        proc.stdout.off("data", onData);
        resolve(output.trim());
      }
    };
    proc.stdout.on("data", onData);
    proc.stdin.write(`${prompt}\n`);
  });
});
