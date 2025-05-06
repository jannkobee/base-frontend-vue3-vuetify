<template>
  <v-dialog v-model="props.visible" max-width="1000" persistent>
    <v-card :title="`${props.action} ${props.entity}`">
      <template v-slot:text>
        <template v-if="props.action === 'Remove'">
          Are you sure you want to delete this item?
        </template>
        <template v-else v-for="field in props.fields" :key="field.key">
          <h5 v-if="field.inputField != 'none'">{{ field.title }}</h5>
          <v-text-field
            v-if="field.inputField === 'text'"
            :required="field.nullable"
            v-model="form[field.key]"
          />
          <v-text-field
            v-else-if="field.inputField === 'date'"
            type="date"
            v-model="form[field.key]"
          />
          <v-checkbox
            v-else-if="field.inputField === 'checkbox'"
            v-model="form[field.key]"
          />
          <v-radio-group
            v-else-if="field.inputField === 'radio'"
            v-model="form[field.key]"
          >
            <v-radio
              v-for="option in field.inputOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </v-radio-group>
        </template>
      </template>

      <template v-slot:actions>
        <v-btn @click="$emit('close')"> Close </v-btn>
        <v-btn
          v-if="props.action === 'Create'"
          prepend-icon="mdi-plus"
          @click="execute"
          color="success"
          :loading="props.loading"
        >
          Create
        </v-btn>
        <v-btn
          v-if="props.action === 'Edit'"
          prepend-icon="mdi-pencil"
          @click="execute"
          color="info"
          :loading="props.loading"
        >
          Edit
        </v-btn>
        <v-btn
          v-if="props.action === 'Remove'"
          prepend-icon="mdi-delete"
          @click="execute"
          color="error"
          :loading="props.loading"
        >
          Delete
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  loading: { type: Boolean, default: false },
  entity: { type: String, default: "" },
  action: { type: String, default: "" },
  visible: { type: Boolean, default: false },
  form: { type: Object, default: () => {} },
  data: { type: Object, default: () => {} },
  fields: { type: Object, default: () => {} },
});

const form = ref();

const emit = defineEmits(["close", "execute"]);

const execute = async () => {
  emit("execute", form.value);
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      form.value = { ...props.form, ...props.data };
    }
  },
);
</script>
