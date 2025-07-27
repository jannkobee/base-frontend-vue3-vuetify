<template>
  <v-empty-state
    headline="Network Error"
    title="Something went wrong"
    :text="text"
    image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const text = ref("");

onMounted(() => {
  route.params.type === "1"
    ? (text.value =
        "Cannot reach the server. Please check your internet connection.")
    : (text.value =
        "Unable to connect to the server. Please check your internet connection.");
});
</script>
