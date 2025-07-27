import { ref } from "vue";

type NotificationType = "success" | "error";

const snackbar = ref(false);
const title = ref("");
const description = ref("");
const color = ref<"green" | "red">("green");

function showNotification(
  newTitle: string,
  newDescription: string,
  type: NotificationType = "success",
) {
  title.value = newTitle;
  description.value = newDescription;
  color.value = type === "success" ? "green" : "red";
  snackbar.value = true;
}

export function useNotification() {
  return {
    snackbar,
    title,
    description,
    color,
    showNotification,
  };
}
