import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/auth/',
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   // Добавляем middleware для обработки basePath в dev
  //   // proxy: {
  //   //   '/api/auth': {
  //   //     target: 'http://stocktaking-auth:5100',
  //   //     changeOrigin: true,
  //   //     secure: false
  //   //   }
  //   // },
  //   // Решение для SPA: перенаправлять все запросы к /auth/* на index.html
  //   fs: {
  //     strict: false // Опционально, если нужен доступ к файлам вне root
  //   }
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
