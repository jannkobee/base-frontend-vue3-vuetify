import axios from "axios";
import notification from "@/components/Notification.vue";
import router from "@/router";

const successNotification = (title: string, description: string) => {
  notification.show({
    title: title,
    description: description,
    color: "green",
  });
};

const errorNotification = (title: string, description: string) => {
  notification.show({
    title: title,
    description: description,
    color: "red",
  });
};

const api = "http://localhost:8000/backend/api/v1";
// const api = "http://13.251.88.87:6083/core/api/v1"

axios.defaults.baseURL = api;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withXSRFToken = true;

const axiosRequest = axios.create({
  baseURL: api,
  // withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${window.localStorage.getItem("APP_TOKEN")}`,
  //   Accept: "application/json",
  // },
});

axiosRequest.interceptors.response.use(
  (res) => {
    if (res.status == 201) {
      successNotification("Success", res.data.message);
    } else if (
      res.status == 200 &&
      res.request.responseURL.endsWith("/logout")
    ) {
      successNotification("Success", res.data.message);
    } else if (res.status == 200 && res.config.method == "delete") {
      notification.show({
        title: "Success",
        description: res.data.message,
        color: "green",
      });
    } else if (res.status == 200 && res.data.message == "Email Sent") {
      successNotification("Success", res.data.message);
    }
    return res;
  },
  (error) => {
    if (!error.response) {
      router.push("/network-error");
    }

    if (error.response.status == 422) {
      if (error.response.data.errors) {
        let temp!: any[];
        const errors = Object.values(error.response.data.errors);
        errors.map(function (value: any, key) {
          temp = value[0];
        });

        notification.show({
          title: "Error",
          description: temp,
          color: "green",
        });
      } else {
        notification.show({
          title: error.response.data.message,
          description: error.response.data.data,
          color: "green",
        });
      }
    } else if (
      error.response.status == 419 &&
      !error.request.responseURL.endsWith("/auth_user")
    ) {
      errorNotification("Error", "Server Error");
    } else if (
      error.response.status == 401 &&
      error.request.responseURL.endsWith("/auth_user")
    ) {
      errorNotification("Error", "Authentication Error. Please login.");

      window.localStorage.removeItem("APP_TOKEN");

      router.push("/login");
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosRequest;
