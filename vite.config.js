import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' 讓打包結果可放在內部網站任意子路徑
export default defineConfig({ base: './', plugins: [vue()] })
