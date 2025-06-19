import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧠 Starting all MCPs from mcp.config.json...\n');

interface MCPConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

interface FullConfig {
  mcpServers: Record<string, MCPConfig>;
}

const configPath = path.resolve(__dirname, '../mcp.config.json');
const config: FullConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

for (const [name, mcp] of Object.entries(config.mcpServers)) {
  const command = mcp.command;
  const args = mcp.args || [];
  const env = { ...process.env, ...(mcp.env || {}) };

  const proc = spawn(command, args, { stdio: 'inherit', env });

  console.log(`🚀 Launched MCP "${name}" → ${command} ${args.join(' ')}`);

  proc.on('close', code => {
    console.log(`❌ MCP "${name}" exited with code ${code}`);
  });

  proc.on('error', err => {
    console.error(`🔥 MCP "${name}" failed to start:`, err);
  });
}