import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // chunk splitting only splits the js code, not the css unfortunately
  plugins: [vue(), splitVendorChunkPlugin()],
  build: {
    // css code splitting is true by default, but it's only for async css?
    cssCodeSplit: true,
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 4000,
  },
});
