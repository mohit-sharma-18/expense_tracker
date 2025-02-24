import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
    },
    base: '/',
    plugins: [react()],
    server: {
      historyApiFallback: true
    }
  };
});