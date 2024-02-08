import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "https://wordlab-ai.vercel.app/",
  server: {
    port: 3000,
    // fs: {
    //   strict: true
    // }

  },
  define: {
    global: 'window',
  },
  plugins: [react()],
  optimizeDeps:{
    include: ['react-daisyui']
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: './index.html'
  //     }
  //   }
  // }
})
