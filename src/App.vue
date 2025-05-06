<template>
  <router-view />

  <v-snackbar v-model="snackbar" :color="color" timeout="3000" location="top right" vertical>
    <div class="text-subtitle-1 pb-2">{{ title }}</div>
    <p>{{ description }}</p>
    <template #actions>
      <v-btn variant="text" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotification } from "@/composables/useNotification";

const { snackbar, title, description, color } = useNotification();
</script>
