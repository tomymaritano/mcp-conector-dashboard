import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import AIModelSelector from './AIModelSelector'


interface Message {
  role: 'user' | 'mcp'
  content: string
}

const MCPConsole: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [modelId, setModelId] = useState('openai')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const handleSend = async () => {
    if (!prompt.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: prompt }])
    setPrompt('')
    setLoading(true)

    try {
      const res = await window.electronAPI.sendToMCP({ name: modelId, prompt })
      setMessages(prev => [...prev, { role: 'mcp', content: res }])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'mcp',
          content: '❌ Error: ' + (err instanceof Error ? err.message : String(err)),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex flex-col h-full w-full bg-black text-green-400 font-mono border border-green-500/30 rounded-xl shadow-inner shadow-green-500/10 p-4">
      <div className="flex-1 overflow-y-auto custom-scroll space-y-3 pr-2 mb-3">
        <AIModelSelector onSelect={setModelId} />
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap text-sm px-3 py-2 rounded-lg max-w-[85%] ${
              msg.role === 'user'
                ? 'ml-auto bg-green-900/20 border border-green-400/30'
                : 'mr-auto bg-green-800/10 border border-green-300/20'
            }`}
          >
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }: React.ComponentProps<'code'> & { inline?: boolean }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        background: '#111',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.85rem',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-green-900/40 px-1 py-0.5 rounded">{children}</code>
                  )
                },
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="text-green-300 text-sm animate-pulse">⌛ Procesando respuesta...</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-auto flex items-end gap-2 border-t border-green-500/20 pt-3">
        <textarea
          className="flex-1 resize-none rounded-md bg-black border border-green-500/30 text-green-300 text-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-green-600"
          rows={2}
          placeholder="Escribí un prompt para el MCP..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-sm font-bold transition border ${
            loading
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed border-gray-500'
              : 'bg-green-600 hover:bg-green-700 text-black border-green-400'
          }`}
        >
          {loading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}

export default MCPConsole
