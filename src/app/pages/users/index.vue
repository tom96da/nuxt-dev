<script setup lang="ts">
import type { User } from '#shared/schema/user'

let users: User[] | undefined
let error: string | undefined
const { data, error: fetchError, pending } = await useFetch('/api/users/')
if (fetchError.value) {
  error = $t('Unexpected Error')
}
else if (data?.value?.length === 0) {
  error = $t('No users found')
}
else {
  users = data.value
}
</script>

<template>
  <div>
    <h1>{{ $t('User List') }}</h1>
    <div v-if="pending">
      {{ $t('Loading users') }}
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="user in users" :key="user.uid">
        <NuxtLinkLocale :to="`/users/${user.uid}`">
          {{ user.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
    <NuxtLinkLocale to="/users/new" class="btn btn-primary">
      {{ $t('Create New User') }}
    </NuxtLinkLocale>
  </div>
</template>
