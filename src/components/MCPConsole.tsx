import React, { useState } from 'react'

declare global {
  interface Window {
    api: {
      sendToMCP: (prompt: string) => Promise<string>
    }
  }
}

const MCPConsole: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleSend = async () => {
    try {
      if (window.api?.sendToMCP) {
        const res = await window.api.sendToMCP(prompt)
        setResponse(res)
      } else {
        setResponse('Error: sendToMCP API is not available.')
      }
    } catch (err) {
      console.error('Error sending to MCP:', err)
      setResponse(`Error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <div>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSend}>Send</button>
      <pre>{response}</pre>
    </div>
  )
}

export default MCPConsole