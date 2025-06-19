# Inkrun MCP Manager

Esta aplicación usa Electron y React para administrar distintos servidores MCP (Model Context Protocol) desde una interfaz gráfica.

## Puesta en marcha

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el modo de desarrollo:
   ```bash
   npm run dev
   ```
   Se abrirá una ventana de Electron con la UI.

## Configuración de `mcp.config.json`

El archivo `mcp.config.json` define qué MCPs se pueden lanzar. Cada entrada indica el comando, sus argumentos y las variables de entorno necesarias. Sustituí los placeholders por tus credenciales reales. Ejemplo para el servidor de GitHub:

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "<tu_token>"
    }
  }
}
```

Tokens habituales que deberás completar:

- `GITHUB_PERSONAL_ACCESS_TOKEN` para GitHub
- `SLACK_BOT_TOKEN` y `SLACK_TEAM_ID` para Slack
- `NOTION_TOKEN` para Notion
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` y `GOOGLE_REFRESH_TOKEN` para Google Drive
- `OPENAI_API_KEY` para el servidor de OpenAI

Guardá los cambios y la aplicación recargará la configuración automáticamente.

## Uso de la interfaz

Al arrancar la app verás una barra lateral con todos los MCPs listados. Usá el interruptor de cada uno para encenderlo o apagarlo. El estado puede ser `offline`, `starting`, `online` o `error`.

En la consola principal tenés un selector de modelo de IA. Elegí el modelo, escribí tu prompt en el cuadro inferior y presioná **Enviar** o la tecla Enter. La respuesta del MCP aparecerá en el panel.

