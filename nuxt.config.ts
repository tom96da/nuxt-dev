// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'

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
    '#server': path.resolve(import.meta.dirname, 'src/server'),
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
