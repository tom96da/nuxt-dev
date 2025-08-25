<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { setLocale } = useI18n()
const localePath = useLocalePath()
const { currentLocale, locales } = useAvailableLocales()

const items = computed<NavigationMenuItem[]>(() => [
  { label: $t('Home'), to: localePath('/') },
  { label: $t('Users'), to: localePath('/users') },
  { label: $t('Settings'), to: localePath('/settings') },
])
</script>

<template>
  <UHeader>
    <template #title>
      <ClientOnly>
        <NuxtLinkLocale to="/">
          <AppLogo class="h-6 w-auto" />
        </NuxtLinkLocale>
      </ClientOnly>
    </template>

    <UNavigationMenu
      :items="items" class="w-full justify-center"
      :ui="{ item: 'min-w-18', link: 'block text-center' }"
    />

    <template #right>
      <UColorModeButton />

      <ULocaleSelect
        v-model="currentLocale" :locales="locales"
        class="h-8 w-30 my-auto" @update:model-value="setLocale($event as AvailableLocaleCode)"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
