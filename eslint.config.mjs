// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import node from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt([
  // Your custom configs here
  node.configs['flat/recommended-module'],
  promise.configs['flat/recommended'],
  stylistic.configs['recommended'],
])
