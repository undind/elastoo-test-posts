<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  formFields?: { title: string; body: string }
  isLoadingSubmit: boolean
}>()

const emit = defineEmits(['submit'])
const title = defineModel('title', { type: String })
const body = defineModel('body', { type: String })

const form = ref(false)

const onSubmit = async () => {
  if (!form.value) return
  emit('submit')
}

const required = (value: string) => {
  return !!value || 'Field is required'
}
</script>

<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <v-text-field label="Title" v-model="title" :rules="[required]" autofocus></v-text-field>
    <v-textarea class="mt-1" label="Body" v-model="body" :rules="[required]"></v-textarea>
    <v-btn
      class="mt-1"
      color="primary"
      type="submit"
      :loading="isLoadingSubmit"
      :disabled="!form"
      block
      >Save</v-btn
    >
  </v-form>
</template>
