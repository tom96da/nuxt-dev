// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import node from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import unicorn from 'eslint-plugin-unicorn'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

export default withNuxt([
  // Your custom configs here
  node.configs['flat/recommended-module'],
  promise.configs['flat/recommended'],
  unicorn.configs['recommended'],
  {
    name: 'ts-resolver',
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.json',
        }),
      ],
    },
  },
  {
    name: 'custom/problematic',
    rules: {
      'no-magic-numbers': ['error', { ignore: [0, 1, -1] }],
      'object-shorthand': ['error', 'always'],
      'class-methods-use-this': 'error',
      'n/no-missing-import': 'off',
      'import/no-unresolved': 'error',
      'n/no-unsupported-features/node-builtins': ['error', { version: '>=24.0.0' }],
      'n/no-unsupported-features/es-syntax': ['error', { version: '>=24.0.0' }],
    },
  },
  {
    name: 'custom/stylistic',
    rules: {
      'max-lines': ['error', { max: 120 }],
      'camelcase': ['error', { properties: 'always' }],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/max-len': ['error', { code: 100 }],
    },
  },
  {
    name: 'custom/app',
    files: ['**/app/**/*.{vue,js,ts}'],
    rules: {
      'no-console': 'error',
      'vue/max-attributes-per-line': [
        'warn', { singleline: { max: 4 }, multiline: { max: 4 } },
      ],
    },
  },
  {
    files: ['**/app/**/*.vue'],
    rules: {
      'unicorn/filename-case': [
        'error', { case: 'pascalCase', ignore: ['app.vue'] }],
    },
  },
  {
    files: ['**/*.{ts,js}'],
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  {
    files: ['**/server/{api,routes}/**/*.{ts,js}', '**/app/{pages,layouts}/**/*.vue'],
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
])
