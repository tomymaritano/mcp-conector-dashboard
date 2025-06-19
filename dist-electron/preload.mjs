"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  startMCP: (name) => electron.ipcRenderer.invoke("start-mcp", name),
  stopMCP: (name) => electron.ipcRenderer.invoke("stop-mcp", name),
  onStatusUpdate: (callback) => {
    electron.ipcRenderer.on("mcp-status", (_event, status) => callback(status));
  }
});
