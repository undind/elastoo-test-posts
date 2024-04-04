<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, RouterView } from 'vue-router'

const route = useRoute()

const showAddBtn = ref(false)

// Detect when show add btn
watch(route, (value) => {
  value.name === 'home' ? (showAddBtn.value = true) : (showAddBtn.value = false)
})
</script>

<template>
  <v-app>
    <v-app-bar scroll-behavior="hide" :elevation="2" color="info">
      <v-app-bar-title class="text-center">
        <v-btn v-if="showAddBtn" variant="tonal" :to="{ name: 'post.add' }">Add post</v-btn>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
