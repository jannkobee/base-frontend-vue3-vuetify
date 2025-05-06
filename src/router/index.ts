// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "admin-login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/components/layouts/AdminContainer.vue"),
    children: [
      {
        path: "",
        name: "admin-home",
        component: () => import("@/views/Admin/Home.vue"),
      },
      {
        path: "user-management",
        name: "user-management",
        component: () =>
          import("@/views/Admin/UserManagement/UserManagement.vue"),
      },
    ],
  },
  // {
  //   path: "/network-error/:type",
  //   name: "network-error",
  //   component: () => import("@/views/NetworkError.vue"),
  // },
  {
    path: "/page-not-found",
    name: "page-not-found",
    component: () => import("@/views/PageNotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: { name: "page-not-found" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!window.localStorage.getItem("APP_TOKEN");

  if (isAuthenticated) {
    if (to.name === "admin-login") {
      next("/admin");
    } else {
      next();
    }
  } else {
    if (to.name !== "admin-login") {
      next({ name: "admin-login" });
    } else {
      next();
    }
  }
});

export default router;
