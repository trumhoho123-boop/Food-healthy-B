import { createRequire } from 'node:module'
import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

const require = createRequire(import.meta.url)

const backendDevServer = () => {
  return {
    name: 'backend-dev-server',
    configureServer(server: ViteDevServer) {
      const app = require('./backend/server.js')
      server.middlewares.use(app)
      console.log('Backend API mounted on the Vite dev server.')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), backendDevServer()],
})
