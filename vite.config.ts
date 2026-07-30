import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const htmlAsset = bundle['index.html'];
      if (!htmlAsset || htmlAsset.type !== 'asset' || typeof htmlAsset.source !== 'string') {
        return;
      }

      htmlAsset.source = htmlAsset.source.replace(
        /<link rel="stylesheet" crossorigin href="\/(assets\/[^"]+\.css)">/g,
        (_, cssFileName: string) => {
          const cssAsset = bundle[cssFileName];
          if (!cssAsset || cssAsset.type !== 'asset' || typeof cssAsset.source !== 'string') {
            return _;
          }

          delete bundle[cssFileName];
          return `<style>${cssAsset.source}</style>`;
        },
      );
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), inlineCssPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
