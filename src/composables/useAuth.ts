import axios from "@/plugins/axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { useAuthStore } from "@/stores/auth";

const user = ref<User | null>(null);
const user_permission = ref([]);
const role_permission = ref([]);

export const useAuth = () => {
  const auth = useAuthStore();
  const router = useRouter();
  const auth_user = ref<any>([]);


  async function login(payload: LoginPayload) {
    const response = await axios.post("/login", payload);
    window.localStorage.setItem("APP_TOKEN", response.data.data);
    //router.push('/admin');
    window.location.href = "/admin";
  }

  async function forgot_password(payload: any) {
    const response = await axios.post("/forgot-password", payload);
    return response;
  }

  async function reset_password(payload: any) {
    const response = await axios.post("/reset-password", payload);
    return response;
  }

  async function logout() {
    try {
      await axios.post("/logout", { id: user.value?.id });
    } catch (e) {
      console.log(e);

      notification.open({
        message: "Logout Successful",
        description: "",
        style: {
          width: "300px",
          marginLeft: `${335 - 600}px`,
        },
        class: "notification-custom-class",
      });
    } finally {
      window.localStorage.removeItem("APP_TOKEN");

      router.push("/admin/login");
    }
  }

  async function getUser(): Promise<User | null> {
    try {
      const res = await axios.get("/auth_user");
      auth_user.value = res.data;
      user_permission.value = res.data.data.permissions;
      console.log(res.data.data.permissions);
      return res.data;
    } catch (err) {
      return null;
    }
  }

  async function update_password(payload: any) {
    const res = await axios.post(`update_password`, payload);
    return res;
  }



  async function initUser() {
    user.value = await getUser();

    // auth.auth_user = user.value
    // role_permission.value = user.value?.role_permission.map((item) => item.name);
    // user_permission.value = user.value?.user_permission.map((item) => item.name);
    // auth.permission = [
    //   ...new Set([...role_permission.value, ...user_permission.value]),
    // ];
  }

  return {
    reset_password,
    forgot_password,
    update_password,
    login,
    logout,
    getUser,
    user,
    initUser,
    auth_user,
    user_permission
  };
};
