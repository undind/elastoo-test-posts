<script setup lang="ts">
import type { IPost } from '@/types/Post'

defineProps<{
  post: IPost
}>()
</script>

<template>
  <v-fade-transition>
    <v-card variant="outlined" hover class="cursor-default">
      <template v-slot:title>{{ post.title }}</template>
      <v-card-text class="text-truncate">{{ post.body }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('edit')">Edit</v-btn>
        <v-btn color="red" @click="$emit('remove')">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-fade-transition>
</template>
