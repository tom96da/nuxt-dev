<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const { setLocale } = useI18n()
const localePath = useLocalePath()
const { currentLocale: locale, locales } = useAvailableLocales()

const items = computed<NavigationMenuItem[]>(() => [
  { label: $t('Home'), to: localePath('/') },
  { label: $t('Users'), to: localePath('/users'), active: route.path.startsWith('/users') },
  { label: $t('Documentation'), to: localePath('/docs'), active: route.path.startsWith('/docs') },
  {
    label: $t('Changelog'), to: localePath('/changelog'),
    badge: { label: 'New', color: 'primary' },
  },
  { label: $t('Settings'), to: localePath('/settings') },
])
</script>

<template>
  <UHeader>
    <template #left>
      <ClientOnly>
        <NuxtLinkLocale to="/">
          <AppLogo class="w-auto h-6" />
        </NuxtLinkLocale>
      </ClientOnly>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <ULocaleSelect
        v-model="locale"
        :locales="locales"
        class="h-8 w-30 my-auto"
        @update:model-value="setLocale($event as AvailableLocaleCode)"
      />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <ClientOnly>
        <UButton
          :label="$t('Sign in')"
          color="neutral"
          variant="outline"
          to="/login"
          class="hidden lg:inline-flex"
        />
      </ClientOnly>

      <!-- <UButton
        label="$t('Sign up')"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/signup"
      /> -->
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />
      <ClientOnly>
        <UButton
          label="$t('Sign in')"
          color="neutral"
          variant="subtle"
          to="/login"
          block
          class="mb-3"
        />
      </ClientOnly>
      <!-- <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      /> -->
    </template>
  </UHeader>
</template>
