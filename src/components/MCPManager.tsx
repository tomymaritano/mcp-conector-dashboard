import React, { useEffect, useState } from 'react'
import MCPConsole from './MCPConsole'
import TooltipBadge from './Tooltip/TooltipBadge'

type MCPStatus = 'offline' | 'online' | 'starting' | 'error'

function isValidStatus(status: string): status is MCPStatus {
  return ['starting', 'online', 'offline', 'error'].includes(status)
}

interface MCPConfig {
  command: string
  args: string[]
  env?: Record<string, string>
  type?: 'official' | 'third-party'
  link?: string
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

  const toggleServer = (name: string, isActive: boolean) => {
    if (isActive) {
      window.electronAPI.startMCP(name)
    } else {
      window.electronAPI.stopMCP(name)
    }
  }

  return (
    <div className="flex h-screen bg-black text-green-400 font-mono">
      {/* Sidebar */}
      <aside className="w-100 p-5 border-r border-green-500/20 bg-zinc-900/30 backdrop-blur-md flex flex-col shadow-inner shadow-green-400/10">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-green-300 tracking-tight">🧠 MCP Modules</h2>
          <p className="text-[11px] text-green-600 mt-1">Activa módulos de inteligencia local</p>
        </div>

        <ul className="flex-1 space-y-4 overflow-y-auto custom-scroll pr-1">
          {servers.map(server => (
            <li
              key={server.name}
              className="flex flex-col gap-1 px-3 py-2 rounded-md border border-green-500/10 bg-zinc-800/20 hover:bg-zinc-800/30 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-200">{server.name}</span>
                    <TooltipBadge type={server.config.type || 'third-party'} link={server.config.link} />
                  </div>
                  <span
                    className={`text-[11px] font-mono ${
                      server.status === 'online'
                        ? 'text-green-400'
                        : server.status === 'error'
                        ? 'text-red-500'
                        : server.status === 'starting'
                        ? 'text-yellow-300'
                        : 'text-zinc-500'
                    }`}
                  >
                    {server.status}
                  </span>
                </div>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={server.status === 'online' || server.status === 'starting'}
                    onChange={e => toggleServer(server.name, e.target.checked)}
                    disabled={server.status === 'starting'}
                  />
                  <div className="w-10 h-5 bg-zinc-700 peer-checked:bg-green-400 rounded-full relative transition duration-300">
                    <div className="absolute top-0.5 left-0.5 h-4 w-4 bg-black border border-green-400 rounded-full transition-transform peer-checked:translate-x-5" />
                  </div>
                </label>
              </div>
            </li>
          ))}
        </ul>

        <footer className="mt-6 text-[10px] text-green-600 text-center">
          <span className="opacity-40">🧬 Inkrun MCP v1.0</span>
        </footer>
      </aside>

      {/* Console */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden bg-zinc-950/80">
        <section className="flex-1 overflow-hidden border border-green-400/10 rounded-xl shadow-inner shadow-green-300/5 backdrop-blur-md">
          <MCPConsole />
        </section>
      </main>
    </div>
  )
}

export default MCPManager