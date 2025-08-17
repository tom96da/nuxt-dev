<script setup lang="ts">
import type { User } from '#shared/schema/user'

const users = useState<User[]>('users', () => [])
const error = useState<string | undefined>('error')

async function fetchUsers() {
  const result = await $fetch('/api/users', { ignoreResponseError: true })
  if (result.success === false) {
    error.value = result.error
    users.value = []
    return
  }
  users.value = result.users
  error.value = undefined
}

await fetchUsers()
</script>

<template>
  <div>
    <h1>User List</h1>
    <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="user in users" :key="user.uid">
        <NuxtLink :to="`/users/${user.uid}`">{{ user.name }}</NuxtLink>
      </li>
    </ul>
    <NuxtLink to="/users/new" class="btn btn-primary">Create New User</NuxtLink>
  </div>
</template>
