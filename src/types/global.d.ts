// src/types/global.d.ts
export {}

type MCPStatus = 'offline' | 'online' | 'starting' | 'error'

declare global {
  interface Window {
      electronAPI: {
        startMCP: (name: string) => Promise<void>
        stopMCP: (name: string) => Promise<void>
        sendToMCP: (payload: { name: string; prompt: string }) => Promise<string>
        onStatusUpdate: (
          callback: (status: { name: string; status: MCPStatus }) => void
        ) => () => void
      }
  }
}
