<template>
  <v-container>
    <v-card height="400" class="mx-auto text-center" color="transparent" flat>
      <v-icon color="grey-darken-2" icon="mdi-tab-search" size="150" />
      <div class="display-3 mt-5">Page not found.</div>
      <div class="grey--text lighten-5 mb-5">
        The page you are trying to get to never existed in this reality,
        or has migrated to a parallel universe.
      </div>
      <v-btn :to="{ name: 'home' }" color="primary">Home page</v-btn>
    </v-card>
  </v-container>
</template>