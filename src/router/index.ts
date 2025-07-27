// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    component: () => import("@/components/layouts/BaseContainer.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/Modules/Dashboard.vue"),
      },
      {
        path: "user-management",
        name: "user-management",
        component: () =>
          import("@/views/Modules/UserManagement/UserManagement.vue"),
      },
      {
        path: "role-management",
        name: "role-management",
        component: () =>
          import("@/views/Modules/RoleManagement/RoleManagement.vue"),
      },
    ],
  },
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
    if (to.name === "login") {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else {
    if (to.name !== "login") {
      next({ name: "login" });
    } else {
      next();
    }
  }
});

export default router;
