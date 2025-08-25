<template>
  <UPage>
    <UPageHeader
      :title="$t('Account Settings')" :description="$t('Manage your account settings here')"
      class="px-6"
    />
    <UPageCard :title="$t('Language')" class="w-full max-w-xl mx-auto mt-5">
      <URadioGroup
        v-model="currentLocale"
        :items="locales.map(locale => ({ label: locale.name, value: locale.code }))"
        @update:model-value="setLocale($event as AvailableLocaleCode)"
      />
    </UPageCard>
  </UPage>
</template>

<script setup lang="ts">
const { setLocale } = useI18n()
const { currentLocale, locales } = useAvailableLocales()
</script>
