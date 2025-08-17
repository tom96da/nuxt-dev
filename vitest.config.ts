import path from 'node:path'

import { defineConfig } from 'vitest/config'
import { defineVitestConfig } from '@nuxt/test-utils/config'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: 'unit',
          include: ['./tests/unit/**/*.test.ts'],
          environment: 'node',
        },
      },
      defineVitestConfig({
        test: {
          name: 'nuxt',
          include: ['./tests/nuxt/**/*.test.ts'],
          environment: 'nuxt',
        },
      }),
      {
        test: {
          name: 'e2e',
          include: ['./tests/e2e/**/*.test.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      include: ['src/**/*.ts'],
    },
  },
  resolve: {
    alias: {
      '#server/*': path.resolve(import.meta.dirname, 'src/server/*'),
      '#shared/*': path.resolve(import.meta.dirname, 'src/shared/*'),
    },
  },
})
