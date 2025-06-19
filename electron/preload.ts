import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  // Métodos para invocar procesos del backend
  startMCP: (name: string) => ipcRenderer.invoke('start-mcp', name),
  stopMCP: (name: string) => ipcRenderer.invoke('stop-mcp', name),
  sendPrompt: (prompt: string) => ipcRenderer.invoke('mcp:prompt', prompt),

  // Escuchar eventos de estado de MCP
  onStatusUpdate: (callback: (status: { name: string; status: string }) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, status: { name: string; status: string }) => {
      callback(status)
    }
    ipcRenderer.on('mcp-status', listener)

    // 🧹 Opción: devolver función para remover listener si lo necesitás
    return () => ipcRenderer.removeListener('mcp-status', listener)
  }
})