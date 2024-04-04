<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import PostForm from '@/components/PostForm.vue'
import { usePostsStore } from '@/stores/posts'
import { editPost } from '@/services/endpoints/posts'
import router from '@/router'

const store = usePostsStore()
const route = useRoute()

const post = computed(() => store.getViewPost)

const isLoading = ref(false)
const isLoadingSubmit = ref(false)
const isPageError = ref(false)
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
  isPageError.value = false;
  if (!route.params.id) {
    return router.push({ name: 'home' })
  }
  isLoading.value = true
  try {
    await store.fetchPost(Number(route.params.id))
    formData.value = {
      title: post.value.title,
      body: post.value.body
    }
    isLoading.value = false
  } catch (error) {
    isPageError.value = true;
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
        <v-card v-if="isPageError && !isLoading" height="400" class="text-center" color="transparent" flat>
          <v-icon color="grey-darken-2" icon="mdi-tab-search" size="150" />
          <div class="display-3 mt-5">Post not found.</div>
        </v-card>
        <v-card v-if="!isLoading && !isPageError" min-width="100%" :title="`Edit post ID: ${post.id}`">
          <v-card-text>
            <PostForm @submit="onSubmit" v-model:title="formData.title" v-model:body="formData.body"
              :isLoadingSubmit="isLoadingSubmit" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
