import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// 🧠 Corrección para tener __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let win: BrowserWindow
const processes: Record<string, ChildProcessWithoutNullStreams> = {}

// ✅ Ruta corregida usando __dirname en contexto ESM
const configPath = path.join(__dirname, '..', 'mcp.config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

app.whenReady().then(() => {
  win = new BrowserWindow({
    title: 'Inkrun MCP Manager',
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // También usa __dirname aquí
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('dist/index.html')
  }
    win.webContents.openDevTools() // Abre consola dev

})

// ✅ Lógica para iniciar MCP servers
ipcMain.handle('start-mcp', (_event, name: string) => {
  const def = config.mcpServers[name]
  if (!def || processes[name]) return

  const child = spawn(def.command, def.args, { shell: true })
  processes[name] = child

  win.webContents.send('mcp-status', { name, status: 'starting' })

  child.stdout.on('data', data => {
    console.log(`[${name}] ${data}`)
    win.webContents.send('mcp-status', { name, status: 'online' })
  })

  child.stderr.on('data', data => {
    console.error(`[${name} error] ${data}`)
    win.webContents.send('mcp-status', { name, status: 'error' })
  })

  child.on('exit', () => {
    delete processes[name]
    win.webContents.send('mcp-status', { name, status: 'offline' })
  })
})

// ✅ Lógica para detener MCP servers
ipcMain.handle('stop-mcp', (_event, name: string) => {
  if (processes[name]) {
    processes[name].kill()
    delete processes[name]
    win.webContents.send('mcp-status', { name, status: 'offline' })
  }
})