import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En GitHub Pages la app vive en /nexashop/; en local o Vercel, en la raíz.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/nexashop/' : '/',
  plugins: [react()],
})
