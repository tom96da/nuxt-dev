<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">名前</label>
      <Field
        id="name" name="name" as="input" type="text"
        :class="{ 'is-invalid': errors.name }" autocomplete="off" required
      />
      <ErrorMessage v-slot="{ message }" name="name">
        <span class="error">{{ message }}</span>
      </ErrorMessage>
    </div>
    <div>
      <label for="email">メールアドレス</label>
      <Field
        id="email" name="email" as="input" type="email"
        :class="{ 'is-invalid': errors.email }" autocomplete="off" required
      />
      <ErrorMessage v-slot="{ message }" name="email">
        <span class="error">{{ message }}</span>
      </ErrorMessage>
    </div>
    <button type="submit">
      send
    </button>
  </form>
</template>

<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { userFormSchema } from '#shared/schema/user'

import { useRouter } from 'vue-router'

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: {
    name: '',
    email: '',
  },
})

const router = useRouter()

const onSubmit = handleSubmit(async (form) => {
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: form,
    })
    router.push('/users')
  }
  catch (error) {
    if (error instanceof Error) {
      alert(`Error: ${error.message}`)
    }
  }
})
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
