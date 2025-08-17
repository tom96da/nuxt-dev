<script setup lang="ts">
import type { User } from '#shared/schema/user'

const uid = useRoute().params.uid as string

const user = useState<User | undefined>('user')
const error = useState<string | undefined>('error')

async function fetchUser() {
  const result = await $fetch(`/api/users/${uid}`, { ignoreResponseError: true })
  if (result.success === false) {
    error.value = result.error
    user.value = undefined
    return
  }
  user.value = result.user
}

await fetchUser()
</script>

<template>
  <div>
    <h1>User Details</h1>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else-if="user">
      <p><strong>UID:</strong> {{ user.uid }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Created At:</strong> {{ user.createdAt }}</p>
      <p><strong>Updated At:</strong> {{ user.updatedAt }}</p>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
