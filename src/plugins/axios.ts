import axios from "axios";
import { useNotification } from "@/composables/useNotification";
import router from "@/router";

const { showNotification } = useNotification();

const successNotification = (title: string, description: string) => {
  showNotification(title, description, "success");
};

const errorNotification = (title: string, description: string) => {
  showNotification(title, description, "error");
};

const api = "http://localhost:8000/backend/api/v1";
// const api = "http://13.251.88.87:6083/core/api/v1"

axios.defaults.baseURL = api;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withXSRFToken = true;

const axiosRequest = axios.create({
  baseURL: api,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("APP_TOKEN")}`,
    Accept: "application/json",
  },
});

axiosRequest.interceptors.response.use(
  (res) => {
    const { status, data, request, config } = res;

    const isLogout = request.responseURL.endsWith("/logout");
    const isDelete = config.method === "delete";
    const isEmailSent = data.message === "Email Sent";

    if (status === 201 || (status === 200 && (isLogout || isDelete || isEmailSent)) || status === 202) {
      successNotification("Success", data.message);
    }

    return res;
  },
  (error) => {
    if (!error.response) {
      errorNotification(
        "Network Error",
        "Cannot reach the server. Please check your internet connection.",
      );
      router.push({ name: "network-error", params: { type: "1" } });

      return Promise.reject(error);
    }

    const { status, data, request } = error.response;

    if (status === 500) {
      errorNotification(
        "Network Error",
        "Unable to connect to the server. Please check your internet connection.",
      );
      router.push({ name: "network-error", params: { type: "2" } });
    } else if (status === 422) {
      errorNotification("Validation Error", data.message);
    } else if (status === 419 && !request.responseURL.endsWith("/auth-user")) {
      errorNotification("Error", "Server Error");
    } else if (status === 401 && request.responseURL.endsWith("/auth-user")) {
      errorNotification("Error", "Authentication Error. Please login again.");
      window.localStorage.removeItem("APP_TOKEN");
      router.push("/login");
    } else {
      errorNotification(
        "Error",
        data.message || "Something went wrong. Please try again.",
      );
    }

    return Promise.reject(error);
  },
);

export default axiosRequest;
