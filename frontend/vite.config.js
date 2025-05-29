import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: !isProduction ? {
        '/api': 'http://localhost:5003',
      } : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: isProduction,
      minify: isProduction ? 'terser' : false,
    },
    base: isProduction ? '/' : '/',
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
  };
});
