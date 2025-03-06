import axios from "@/plugins/axios";
import { ref } from "vue";
import { useUpload } from "./useUpload";
import { Data } from "@/types/types";

export const useApi = <T>(endpoint: string) => {
  const items = ref<T[]>([]);
  const loading = ref(false);
  const item = ref();
  const options = ref([]);
  const { downloadFile } = useUpload();

  const pagination = ref<Data>({
    current_page: 0,
    from: 0,
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0,
  });

  const assignPagination = (data: Data) => {
    pagination.value.current_page = data.current_page;
    pagination.value.from = data.from;
    pagination.value.last_page = data.last_page;
    pagination.value.per_page = data.per_page;
    pagination.value.to = data.to;
    pagination.value.total = data.total;
  };

  async function index(payload?: any) {
    loading.value = true;
    const res = await axios.get(endpoint, { params: { ...payload } });
    items.value = res.data.data.data;
    assignPagination(res.data.data);
    loading.value = false;
    return res;
  }

  async function store(payload: any) {
    const res = await axios.post(endpoint, payload);
    return res;
  }

  async function show(id: any) {
    loading.value = true;
    const res = await axios.get(`${endpoint}/${id}`);
    items.value = res.data.data;
    loading.value = false;
    return res.data.data;
  }

  async function update(id: any, payload: any) {
    const res = await axios.put(`${endpoint}/${id}`, payload);
    index();
    return res;
  }

  async function destroy(id: number) {
    const res = await axios.delete(`${endpoint}/${id}`);
    index();
    return res;
  }

  async function download(payload: any) {
    const res = await axios.get(`${endpoint}/export`, {
      params: { ...payload },
      responseType: "arraybuffer",
    });
    downloadFile(res.data, payload.filename);
  }

  async function getOptions() {
    const res = await axios.get(`${endpoint}/options`);
    return (options.value = res.data.data);
  }

  return {
    index,
    item,
    items,
    loading,
    pagination,
    store,
    show,
    update,
    destroy,
    options,
    getOptions,
    download,
    endpoint,
  };
};
