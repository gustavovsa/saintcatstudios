
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // O GitHub Pages publica o site em /saintcatstudios/ (nome do repositório)
  base: '/saintcatstudios/',
})
