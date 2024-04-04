<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import PostForm from '@/components/PostForm.vue'
import { usePostsStore } from '@/stores/posts'
import { editPost } from '@/services/endpoints/posts'

const store = usePostsStore()
const route = useRoute()

const post = computed(() => store.getViewPost)

const isLoading = ref(false)
const isLoadingSubmit = ref(false)
const snackbar = ref({
  show: false,
  type: 'success',
  text: ''
})
const formData = ref({
  title: '',
  body: ''
})

const onSubmit = async () => {
  isLoadingSubmit.value = true
  try {
    await editPost(post.value.id, { ...post.value, ...formData.value })
    isLoadingSubmit.value = false
    snackbar.value = {
      show: true,
      type: 'success',
      text: 'Saved successfully.'
    }
  } catch (error) {
    isLoadingSubmit.value = false
    snackbar.value = {
      show: true,
      type: 'error',
      text: 'Something went wrong'
    }
  }
}

onBeforeMount(async () => {
  isLoading.value = true
  try {
    await store.fetchPost(Number(route.params.id))
    formData.value = {
      title: post.value.title,
      body: post.value.body
    }
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
})
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
        <v-skeleton-loader v-if="isLoading" class="border" type="card" />
        <v-card v-else min-width="100%" :title="`Edit post ID: ${post.id}`">
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
