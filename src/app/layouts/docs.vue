<script setup lang="ts">
// eslint-disable-next-line unicorn/prevent-abbreviations
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('docs')
}, {
  transform: data => data.find(item => item.path === '/docs')?.children || data || [],
})
const { data: files } = useLazyAsyncData('search', () => {
  return queryCollectionSearchSections('docs')
}, {
  server: false,
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <template #top>
                <UContentSearchButton :collapsed="false" />
              </template>

              <UContentNavigation
                :navigation="navigation"
                highlight
              />
            </UPageAside>
          </template>

          <slot />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </div>
</template>
