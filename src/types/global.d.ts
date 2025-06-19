// src/types/global.d.ts
export {}

type MCPStatus = 'offline' | 'online' | 'starting' | 'error'

declare global {
  interface Window {
    electronAPI: {
      startMCP: (name: string) => Promise<void>
      stopMCP: (name: string) => Promise<void>
      sendPrompt: (prompt: string) => Promise<void>
      onStatusUpdate: (
        callback: (status: { name: string; status: MCPStatus }) => void
      ) => () => void
    }
  }
}