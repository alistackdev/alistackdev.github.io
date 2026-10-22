import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'case-study-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            const urlPath = req.url.split('?')[0].replace(/[.]+$/, '');
            if (urlPath === '/case-study' || urlPath === '/case-study/' || urlPath === '/case-study.html') {
              const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
              req.url = '/case-study.html' + query;
            }
          }
          next();
        });
      }
    }
  ],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'motion/react': resolve(__dirname, './src/lib/motion-react.tsx'),
      'figma:react': resolve(__dirname, './src/lib/figma-react.ts'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        caseStudy: resolve(__dirname, 'case-study.html'),
        caseStudyRag: resolve(__dirname, 'case-study-rag.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
