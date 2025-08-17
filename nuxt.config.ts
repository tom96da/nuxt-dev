// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@vee-validate/nuxt',
  ],
  devtools: { enabled: true },
  dir: {
    shared: 'src/shared/',
    public: 'src/public/',
  },
  srcDir: 'src/app/',
  serverDir: 'src/server/',
  alias: {
    '#server': fileURLToPath(new URL('src/server', import.meta.url)),
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
