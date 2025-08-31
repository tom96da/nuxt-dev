<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('changelog', () => {
  return queryCollection('changelog').first()
})
const { data: versions } = await useAsyncData(route.path, () => {
  return queryCollection('versions').order('date', 'DESC').all()
})
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPageBody>
      <UChangelogVersions>
        <UChangelogVersion
          v-for="(version, index) in versions"
          :key="index"
          v-bind="version"
        >
          <template #body>
            <ContentRenderer :value="version.body" />
          </template>
        </UChangelogVersion>
      </UChangelogVersions>
    </UPageBody>
  </UContainer>
</template>
