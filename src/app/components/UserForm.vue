<template>
  <UCard>
    <UForm
      :schema="userFormSchema"
      :state="state"
      class="space-y-4 p-4"
      @submit="onSubmit"
    >
      <UFormField
        :label="$t('Name')"
        name="name"
      >
        <UInput
          v-model="state.name"
          type="text"
          class="w-full"
          required
        />
      </UFormField>
      <UFormField
        :label="$t('Email')"
        name="email"
      >
        <UInput
          v-model="state.email"
          type="email"
          class="w-full"
          required
        />
      </UFormField>

      <UButton type="submit">
        {{ $t('Submit') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { userFormSchema } from '#shared/schema/user'

const toast = useToast()
const router = useRouter()
const localePath = useLocalePath()

type FormData = z.infer<typeof userFormSchema>
const state = reactive<Partial<FormData>>({})

const onSubmit = async (_event: FormSubmitEvent<FormData>) => {
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: state,
    })
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({
        title: $t('Unexpected Error'),
        description: error.message,
        color: 'error',
      })
      return
    }
  }
  router.push(localePath('/users'))
  toast.add({
    title: $t('Success'),
    description: $t('User created successfully'),
    color: 'success',
  })
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}

.is-invalid {
  border-color: red;
}
</style>
