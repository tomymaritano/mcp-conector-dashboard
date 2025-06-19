# Inkrun MCP Manager

Inkrun is an Electron + React application for launching Model Context Protocol (MCP) servers locally and chatting with them through a simple console interface.

## Environment configuration

Copy `.env.example` to `.env` and fill in your provider keys:

```bash
cp .env.example .env
```

Set at least `OPENAI_API_KEY` or any other keys required by the MCP servers you plan to use.

## Running the application

Start the development environment with:

```bash
npm run dev
```

A window will list the MCP modules defined in `mcp.config.json`. Toggle one to start it, select it in the drop-down menu and type a prompt to interact with the running MCP.

## Adding new MCP modules

Edit `mcp.config.json` to add or customize servers. Each entry defines the command used to launch the MCP and optional environment variables. New entries automatically appear in the model selector.

## Testing MCP servers

You can quickly launch every configured server from the command line:

```bash
npm run test:mcps
```
