"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  startMCP: (name) => electron.ipcRenderer.invoke("start-mcp", name),
  sendPrompt: (prompt) => electron.ipcRenderer.invoke("mcp:prompt", prompt),
  stopMCP: (name) => electron.ipcRenderer.invoke("stop-mcp", name),
  sendToMCP: (message) => electron.ipcRenderer.invoke("send-to-mcp", message),
  onStatusUpdate: (callback) => {
    electron.ipcRenderer.on("mcp-status", (_event, status) => callback(status));
  }
});
