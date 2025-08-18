import { defineConfig } from 'vitest/config'
import { defineVitestConfig } from '@nuxt/test-utils/config'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

const resolve = {
  alias: {
    '#server': '/src/server',
    '#shared': '/src/shared',
  },
}

export default defineConfig({
  plugins: [viteTsconfigPaths(), vue()],
  test: {
    projects: [
      {
        plugins: [vue(), viteTsconfigPaths()],
        test: {
          name: 'unit',
          include: ['./src/**/*.test.ts', './tests/unit/**/*.test.ts'],
          environment: 'happy-dom',
        },
        resolve,
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
})
