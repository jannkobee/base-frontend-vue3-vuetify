<template>
  <Form
    :loading="loadingActions"
    :entity="entity"
    :action="action"
    :visible="visible"
    :form="form"
    :data="data"
    :fields="fields"
    @close="close"
    @execute="execute"
  />
  <DataTable
    :title="title"
    :headers="fields"
    :data="items"
    :loading="loading"
    :pagination="pagination"
    @filter="index"
    @create="create"
    @edit="edit"
    @remove="remove"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { fields } from "@/fields/user";
import { User } from "@/types/types";

const {
  index,
  items,
  loading,
  loadingActions,
  pagination,
  store,
  update,
  destroy,
} = useApi("/users");

const title = ref("User Management");
const entity = ref("User");
const visible = ref(false);
const action = ref("");
const data = ref();

const form = ref<User>({
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  gender: "",
  birthday: "",
  is_admin: false,
});

const create = () => {
  visible.value = true;

  action.value = "Create";

  data.value = form.value;
};

const edit = (dataParam: any) => {
  visible.value = true;

  action.value = "Edit";

  data.value = dataParam;
};

const remove = (dataParam: any) => {
  visible.value = true;

  action.value = "Remove";

  data.value = dataParam;
};

const close = () => {
  visible.value = false;
};

const execute = async (data: any) => {
  try {
    if (action.value === "Create") {
      await store(data);
    } else if (action.value === "Edit") {
      await update(data.id, data);
    } else if (action.value === "Remove") {
      await destroy(data.id);
    }

    visible.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await index();
});
</script>
