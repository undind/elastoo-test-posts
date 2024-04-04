<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <v-col v-for="item in count" :key="item" cols="12" sm="6" lg="4">
    <v-skeleton-loader class="border" type="card"></v-skeleton-loader
  ></v-col>
</template>
