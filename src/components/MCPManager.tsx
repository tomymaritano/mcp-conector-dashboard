// src/components/MCPManager.tsx
import React, { useEffect, useState } from 'react'
import MCPConsole from './MCPConsole'
type MCPStatus = 'offline' | 'online' | 'starting' | 'error'

function isValidStatus(status: string): status is MCPStatus {
  return ['starting', 'online', 'offline', 'error'].includes(status)
}

interface MCPConfig {
  command: string
  args: string[]
  env?: Record<string, string>
}

interface MCPEntry {
  name: string
  config: MCPConfig
  status: MCPStatus
}

const MCPManager: React.FC = () => {
  const [servers, setServers] = useState<MCPEntry[]>([])

  useEffect(() => {
    fetch('mcp.config.json')
      .then(res => res.json())
      .then((data: { mcpServers: Record<string, MCPConfig> }) => {
        const loaded: MCPEntry[] = Object.entries(data.mcpServers).map(([name, config]) => ({
          name,
          config,
          status: 'offline',
        }))
        setServers(loaded)
      })

    if (window.electronAPI?.onStatusUpdate) {
      const unsubscribe = window.electronAPI.onStatusUpdate((payload: { name: string; status: string }) => {
        if (isValidStatus(payload.status)) {
          updateMCPStatus(payload.name, payload.status)
        }
      })

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe()
        }
      }
    }
  }, [])

  const updateMCPStatus = (name: string, status: MCPStatus) => {
    setServers(prev =>
      prev.map(server =>
        server.name === name ? { ...server, status } : server
      )
    )
  }

  const handleStart = (name: string) => {
    window.electronAPI.startMCP(name)
  }

  const handleStop = (name: string) => {
    window.electronAPI.stopMCP(name)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🧠 Inkrun MCP Manager</h1>
      <div className="grid grid-cols-1 gap-4">
        {servers.map((server) => (
          <div
            key={server.name}
            className="flex items-center justify-between p-4 border rounded shadow-sm"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{server.name}</span>
              <span
                className={`text-sm mt-1 ${
                  server.status === 'online'
                    ? 'text-green-600'
                    : server.status === 'error'
                    ? 'text-red-600'
                    : server.status === 'starting'
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Estado: {server.status}
              </span>
            </div>
            <div className="space-x-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                onClick={() => handleStart(server.name)}
                disabled={server.status === 'online' || server.status === 'starting'}
              >
                Start
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                onClick={() => handleStop(server.name)}
                disabled={server.status === 'offline'}
              >
                Stop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MCPManager