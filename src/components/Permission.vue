<template>
  <v-dialog v-model="props.visible" max-width="1000" persistent>
    <v-card title="Edit Permissions">
      <template v-slot:text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(group, model) in groupedPermissions"
            :key="model"
          >
            <v-expansion-panel-title>
              {{ model.split("\\").pop() }} Permissions
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-checkbox
                v-for="permission in group"
                v-model="permissions"
                :key="permission.id"
                :label="permission.name"
                :value="permission.id"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>

      <template v-slot:actions>
        <v-btn @click="$emit('close')">Close</v-btn>
        <v-btn
          prepend-icon="mdi-pencil"
          color="info"
          :loading="loading"
          @click="execute"
        >
          Save Permission
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useApi } from "@/composables/useApi";
import { Permission } from "@/types/types";
import type { PropType } from "vue";
import axios from "@/plugins/axios";

const props = defineProps({
  visible: { type: Boolean, default: false },
  data: {
    type: Object as PropType<{
      id: string;
      name: string;
      permissions: Permission[];
    }>,
    default: () => ({
      name: "",
      permissions: [],
    }),
  },
});

const { index, items } = useApi<Permission>("/permissions");

const loading = ref(false);

const emit = defineEmits(["close"]);

const permissions = ref<any>([]);

const groupedPermissions = computed(() => {
  const groups: Record<string, Permission[]> = {};
  for (const permission of items.value) {
    if (!groups[permission.model]) {
      groups[permission.model] = [];
    }
    groups[permission.model].push(permission);
  }
  return groups;
});

const fillPermissions = () => {
  permissions.value = props.data.permissions.map((p) => p.id);

  console.log("Filled permissions:", permissions.value);
};

const execute = async () => {
  const data = {
    permissions: permissions.value,
  };

  loading.value = true;

  await axios.put(`/role-permissions/${props.data.id}`, data).finally(() => {
    loading.value = false;
  });
};

onMounted(async () => {
  await index({ all: true } as any);
});

watch(
  () => props.data,
  () => {
    fillPermissions();

    console.log("Data changed:", props.data);
  },
);
</script>
