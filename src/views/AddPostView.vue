<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PostForm from '@/components/PostForm.vue'
import { createPost } from '@/services/endpoints/posts'

const router = useRouter()

const isLoadingSubmit = ref(false)
const formData = ref({
  title: '',
  body: ''
})
const snackbar = ref({
  show: false,
  type: 'error',
  text: ''
})

const onSubmit = async () => {
  isLoadingSubmit.value = true
  try {
    await createPost(formData.value)
    router.push({ name: 'home', state: { showSnackbar: true } })
  } catch (error) {
    isLoadingSubmit.value = false
    snackbar.value = {
      show: true,
      type: 'error',
      text: 'Something went wrong'
    }
  }
}
</script>

<template>
  <v-container>
    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.type" location="top right">
      {{ snackbar.text }}
    </v-snackbar>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="7" lg="5">
        <v-btn :to="{ name: 'home' }" variant="tonal" flat>Back</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="7" lg="5">
        <v-card min-width="100%" title="Create post">
          <v-card-text>
            <PostForm
              @submit="onSubmit"
              v-model:title="formData.title"
              v-model:body="formData.body"
              :isLoadingSubmit="isLoadingSubmit"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
