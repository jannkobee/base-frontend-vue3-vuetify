<template>
  <h1>{{ title }}</h1>
  <v-container class="container">
    <v-btn
      v-if="showCreateAction"
      class="button"
      prepend-icon="mdi-plus"
      elevation="4"
      @click="$emit('create')"
    >
      Create
    </v-btn>
    <v-text-field
      v-model="form.search"
      class="text-field"
      append-inner-icon="mdi-magnify"
      density="compact"
      placeholder="Search here..."
      variant="outlined"
      hide-details
      clearable
      @input="emitFilter"
      @click:clear="emitFilter"
    />
  </v-container>
  <v-data-table-server
    :headers="props.headers"
    :items="props.data"
    :items-length="props.pagination.total"
    :items-per-page-options="[5, 10, 20, 50, 100]"
    loading-text="Loading... Please wait"
    :loading="props.loading"
    item-value="title"
    @update:options="handleTableChange"
  >
    <template #top> </template>
    <template #item.is_admin="{ item }">
      <v-checkbox-btn
        v-model="(item as User).is_admin"
        style="pointer-events: none"
        readonly
      />
    </template>
    <template #item.action="{ item }">
      <v-container class="action-container">
        <v-btn
          v-if="showEditAction"
          size="small"
          elevation="4"
          density="comfortable"
          icon="mdi-pencil"
          @click="$emit('edit', item)"
        />
        <v-btn
          v-if="showDeleteAction"
          size="small"
          elevation="4"
          density="comfortable"
          icon="mdi-delete"
          @click="$emit('remove', item)"
        />
      </v-container>
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup>
import { ColumnConfig, Data, User } from "@/types/types";
import { ref } from "vue";
import debounce from "lodash/debounce";

const props = defineProps({
  title: { type: String, default: "" },
  headers: { type: Array as () => ColumnConfig[], default: () => [] },
  data: { type: Array as () => any[], default: () => [] },
  pagination: { type: Object as () => Data, default: () => ({}) },
  loading: { type: Boolean, default: false },
  showCreateAction: { type: Boolean, default: true },
  showEditAction: { type: Boolean, default: true },
  showDeleteAction: { type: Boolean, default: true },
});

const emit = defineEmits(["filter", "create", "edit", "remove"]);

const form = ref({
  page: 1,
  limit: 10,
  sortBy: [],
  search: "",
});

const handleTableChange = (options: any) => {
  form.value = { ...form.value, ...options };

  emitFilter();
};

const emitFilter = debounce(() => {
  emit("filter", form.value);
}, 300);
</script>

<style lang="css" scoped>
.container {
  padding: 5px 0 0 0;
  display: flex;
  min-width: 100%;
  gap: 20px;
}

.text-field {
  max-width: 500px;
  margin-left: auto;
}

.action-container {
  padding: 0;
  margin: 0;
  display: flex;
  gap: 5px;
}

@media (max-width: 1200px) {
  .container {
    flex-direction: column;
    gap: 5px;
  }

  .button {
    width: 100%;
    margin-bottom: 15px;
  }

  .text-field {
    min-width: 100%;
    margin-left: auto;
  }
}
</style>
