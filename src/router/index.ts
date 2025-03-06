// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
        component: () => import("@/views/Admin/UserManagement.vue"),
      },
    ],
  },
  {
    path: "/page-not-found",
    name: "page-not-found",
    component: () => import("@/views/NotFound.vue"),
  },
  // Catch-All Route & Redirect to Page Not Found if Route is not Found
  {
    path: "/:pathMatch(.*)*",
    redirect: "/page-not-found",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
