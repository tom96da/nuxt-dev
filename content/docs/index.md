---
title: Nuxt dev
description: Welcome to Nuxt Dev
---

This is a Sample.

## CI

- [vitest](https://vitest.dev/)

  ```sh
  pnpm run test
  ```

- typecheck
- i18n

  ```json [i18n/locales/en.json]
  {
    "hello-world" : "Hello World!"
  }
  ```


| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui-pro']
})
```

::code-group

```bash [pnpm]
pnpm add @nuxt/ui-pro
```

```bash [yarn]
yarn add @nuxt/ui-pro
```

```bash [npm]
npm install @nuxt/ui-pro
```

```bash [bun]
bun add @nuxt/ui-pro
```

::
