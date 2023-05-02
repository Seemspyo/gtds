import { resolve } from 'node:path'

import createReactPlugin from '@vitejs/plugin-react'
import {
  defineConfig,
  loadEnv,
  splitVendorChunkPlugin as createSplitVendorChunkPlugin,
} from 'vite'
import createEslintPlugin from 'vite-plugin-eslint'
import { ViteFaviconsPlugin as createFaviconPlugin } from 'vite-plugin-favicon2'
import { createHtmlPlugin } from 'vite-plugin-html'
import createTsconfigPathsPluin from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const envDir = resolve(__dirname, 'env')
  const env = loadEnv(mode, envDir)

  return {
    mode:
      env.VITE_USER_NODE_ENV === 'development' ? 'development' : 'production',
    base: env.VITE_APP_BASE_PATH,
    envDir,
    publicDir: 'none',
    build: {
      target: 'es2019',
      outDir: 'dist',
      emptyOutDir: true,
    },
    plugins: [
      createEslintPlugin(),
      createTsconfigPathsPluin(),
      createReactPlugin(),
      createHtmlPlugin({
        entry: resolve(__dirname, 'src/main.tsx'),
        template: 'public/index.html',
        inject: {
          data: {
            title: '가디언테일즈 Discovery 길드',
          },
        },
      }),
      createFaviconPlugin({
        logo: 'public/favicon.jpg',
      }),
      createSplitVendorChunkPlugin(),
    ],
  }
})
