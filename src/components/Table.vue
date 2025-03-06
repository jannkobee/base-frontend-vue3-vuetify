<template>
  <h1>{{ title }}</h1>
  <v-data-table-server
    v-model:items-per-page="pagination.itemsPerPage"
    :headers="props.headers"
    :items="props.data"
    :items-length="props.pagination.total"
    :items-per-page-options="[10, 20, 50, 100]"
    :loading="props.loading"
    item-value="title"
    @update:options="loadItems"
  >
    <template #item.is_admin="{ item }">
      <v-checkbox-btn v-model="(item as User).is_admin" readonly />
    </template>
    <template #item.action>
      <v-icon class="me-2" size="small">mdi-pencil</v-icon>
      <v-icon size="small">mdi-delete</v-icon>
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup>
import { TableHeader, Data, User } from "@/types/types";
import { ref, onMounted } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  headers: { type: Object as () => TableHeader[], default: () => {} },
  data: { type: Object as () => any, default: () => {} },
  pagination: { type: Object as () => Data, default: () => {} },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["change"]);

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [] as { key: string; order: "asc" | "desc" }[],
});

function loadItems(options: any) {
  pagination.value = options;

  emit("change", pagination.value);

  console.log("Pagination Options:", options);
}

onMounted(async () => {
  //
});
</script>
