<template>
  <DataTable
    :title="'User Management'"
    :headers="fields"
    :data="items"
    :loading="loading"
    :pagination="pagination"
    @change="(data: any) => index(data)"
  />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { fields } from "@/fields/user";

const { index, items, loading, pagination } = useApi("/users");

onMounted(async () => {
  await index();
});
</script>
