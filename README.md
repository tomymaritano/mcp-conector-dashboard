<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# inkrun

``` These errors are common in MACOSX
2025-06-18 23:06:39.174 Electron[71655:42236000] _TIPropertyValueIsValid called with 16 on nil context!
2025-06-18 23:06:39.174 Electron[71655:42236000] imkxpc_getApplicationProperty:reply: called with incorrect property value 16, bailing.
2025-06-18 23:06:39.174 Electron[71655:42236000] Text input context does not respond to _valueForTIProperty:
11:07:08 PM [vite] page reload mcp.config.json
```
## Environment configuration

The application expects a `.env` file in the project root containing API keys that MCP servers use to communicate with external providers.  A template is available in [`.env.example`](./.env.example).

1. Copy the template:
   ```bash
   cp .env.example .env
   ```
2. Obtain your provider keys and fill in the values:
   - **OpenAI** – Create a key at <https://platform.openai.com/account/api-keys> and set `OPENAI_API_KEY`.
   - **Anthropic/Claude** – Create a key at <https://console.anthropic.com/> and set `ANTHROPIC_API_KEY`.

## Running and using MCPs

Start the application in development mode:
```bash
npm run dev
```
A window will open listing available MCP modules. Enable the one you want by toggling the switch next to its name. When the status shows `online`, select a model in the console panel, type a prompt and press **Enter** (or click **Enviar**) to send it to the running MCP.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# inkrun

``` These errors are common in MACOSX
2025-06-18 23:06:39.174 Electron[71655:42236000] _TIPropertyValueIsValid called with 16 on nil context!
2025-06-18 23:06:39.174 Electron[71655:42236000] imkxpc_getApplicationProperty:reply: called with incorrect property value 16, bailing.
2025-06-18 23:06:39.174 Electron[71655:42236000] Text input context does not respond to _valueForTIProperty:
11:07:08 PM [vite] page reload mcp.config.json
```
>>>>>>> codex/add-missing-newline-to-files
