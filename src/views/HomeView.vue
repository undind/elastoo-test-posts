<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

import PostItem from '@/components/PostItem.vue'
import ListSkeleton from '@/components/ListSkeleton.vue'

import { usePostsStore } from '@/stores/posts'
import { usePagination } from '@/utils/helpers'
import { deletePost } from '@/services/endpoints/posts'
import type { IPost } from '@/types/Post'

const router = useRouter()
const store = usePostsStore()
const { paginatedData, perPage, page } = usePagination({ store })

const isLoading = ref(false)
const dialog = ref<{ show: boolean; text: string; id: number | null }>({
  show: false,
  text: '',
  id: null
})
const snackbar = ref({
  show: false,
  type: 'success',
  text: ''
})

const onEdit = (id: number) => {
  router.push({ name: 'post.view', params: { id } })
}

const onRemove = (item: IPost) => {
  dialog.value = {
    show: true,
    text: `Are you sure want to remove post ID: ${item.id}?`,
    id: item.id
  }
}

const onConfirmRemove = async () => {
  if (!dialog.value.id) {
    dialog.value = { ...dialog.value, show: false }
    return
  }
  const id = dialog.value.id
  dialog.value = { ...dialog.value, show: false }
  store.removePost(id)
  try {
    await deletePost(id)
    snackbar.value = {
      show: true,
      type: 'success',
      text: 'Successfully remove post.'
    }
  } catch (error) {
    dialog.value = { ...dialog.value, show: false }
    snackbar.value = {
      show: true,
      type: 'error',
      text: 'Something went wrong'
    }
    store.fetchAllPosts()
  }
}

onBeforeMount(async () => {
  isLoading.value = true
  try {
    await store.fetchAllPosts()
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="2000"
        :color="snackbar.type"
        location="top right"
      >
        {{ snackbar.text }}
      </v-snackbar>
      <v-dialog v-model="dialog.show" max-width="400">
        <v-card :text="dialog.text">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn @click="dialog.show = false"> Cancel </v-btn>
            <v-btn @click="onConfirmRemove" color="red"> Remove </v-btn>
          </template>
        </v-card>
      </v-dialog>
      <ListSkeleton v-if="isLoading" :count="18" />
      <v-col v-else v-for="item in paginatedData" :key="item.id" cols="12" sm="6" lg="4">
        <PostItem :post="item" @edit="onEdit(item.id)" @remove="onRemove(item)" />
      </v-col>
    </v-row>
    <v-row v-if="!isLoading" justify="center">
      <v-col cols="12">
        <v-pagination
          v-model="page"
          :length="Math.ceil(store.getList.length / perPage)"
          rounded="circle"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
