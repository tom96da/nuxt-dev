<script setup lang="ts">
const toaster = { position: 'top-center' } as const
</script>

<template>
  <UApp :toaster="toaster">
    <AppHeader />

    <UMain>
      <slot />
    </UMain>

    <AppFooter />
  </UApp>
</template>
