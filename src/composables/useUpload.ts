import axios from "@/plugins/axios";
import { ref } from "vue";

export const useUpload = () => {
  const endpoint = ref<string>("/uploads");
  // const url = ref<string>('https://54.169.156.124/core/core/api/v1/uploads');
  const url = ref<string>('http://127.0.0.1:8000/core/api/v1/uploads');

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("APP_TOKEN")}`,
  };

  async function store(path: string){
    await axios.post(endpoint.value,{path: path});
  }


  async function downloadFile(data: any, fileName: string) {
    const fileURL = window.URL.createObjectURL(new Blob([data]));
    const fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute("download", fileName);
    document.body.appendChild(fileLink);
    fileLink.click();
    document.body.removeChild(fileLink);
  }

  return {
    downloadFile,
    store,
    url,
    headers,
    endpoint
  };
};
