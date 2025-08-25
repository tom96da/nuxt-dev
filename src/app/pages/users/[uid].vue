<script setup lang="ts">
import { StatusCodes } from 'http-status-codes'
import type { User } from '#shared/schema/user'

const uid = useRoute().params.uid as string

const { data, error: fetchError, pending } = await useFetch(`/api/users/${uid}`)
const user: User | undefined = data.value
</script>

<template>
  <div>
    <h1>{{ $t('User Details') }}</h1>
    <div v-if="pending">
      {{ $t('Loading user data') }}
    </div>
    <div v-else-if="fetchError?.statusCode === StatusCodes.NOT_FOUND">
      {{ $t('User not found') }}
    </div>
    <div v-else>
      <p><strong>UID:</strong> {{ user!.uid }}</p>
      <p><strong>Name:</strong> {{ user!.name }}</p>
      <p><strong>Email:</strong> {{ user!.email }}</p>
      <p><strong>Created At:</strong> {{ user!.createdAt }}</p>
      <p><strong>Updated At:</strong> {{ user!.updatedAt }}</p>
    </div>
  </div>
</template>
