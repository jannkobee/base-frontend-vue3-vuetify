<template>
  <v-snackbar
    :color="color"
    :timeout="duration"
    v-model="showSnackbar"
    bottom
    right
  >
    <v-icon left>
      {{ icon }}
    </v-icon>
    <div class="text-subtitle-1 pb-2">{{ title }}</div>

    <p>{{ description }}</p>
  </v-snackbar>
</template>

<script lang="ts">
import { ref, defineExpose } from "vue";

export default {
  name: "notification",
  setup() {
    const showSnackbar = ref(false);
    const title = ref("");
    const description = ref("");
    const color = ref("success");
    const icon = ref("mdi-check");
    const duration = ref(3000);

    const show = (data: {
      title?: string;
      description?: string;
      color?: string;
      icon?: string;
      duration?: number;
    }) => {
      title.value = data.title || "";
      description.value = data.description || "";
      color.value = data.color || "success";
      duration.value = data.duration || 3000;
      icon.value = data.icon || "mdi-check";
      showSnackbar.value = true;
    };

    // Expose for parent use
    defineExpose({
      show,
    });

    return {
      showSnackbar,
      title,
      description,
      color,
      icon,
      duration,
    };
  },
};
</script>
