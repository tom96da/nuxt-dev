// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
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
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
    defaultLocale: 'ja',
    detectBrowserLanguage: false,
    restructureDir: 'src/i18n',
  },
})
