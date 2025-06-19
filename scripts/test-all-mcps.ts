import 'dotenv/config'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

console.log('🧠 Starting all MCPs from mcp.config.json...\n')

const configPath = path.resolve('mcp.config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

type MCPConfig = {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

const servers = config.mcpServers
const processes: Record<string, ReturnType<typeof spawn>> = {}

for (const [name, server] of Object.entries(servers as Record<string, MCPConfig>)) {
  const { command, args, env } = server;

  console.log(`🚀 Launching MCP "${name}" → ${command} ${args.join(' ')}`)

  const child = spawn(command, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      ...(env || {})
    }
  })

  child.on('exit', code => {
    if (code === 0) {
      console.log(`✅ MCP "${name}" exited cleanly\n`)
    } else {
      console.log(`❌ MCP "${name}" exited with code ${code}\n`)
    }
  })

  processes[name] = child
}