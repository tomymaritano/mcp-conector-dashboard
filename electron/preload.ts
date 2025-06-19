import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  startMCP: (name: string) => ipcRenderer.invoke('start-mcp', name),
  stopMCP: (name: string) => ipcRenderer.invoke('stop-mcp', name),
  onStatusUpdate: (callback: (status: { name: string; status: string }) => void) => {
    ipcRenderer.on('mcp-status', (_event, status) => callback(status))
  }
})