import { useAuthStore } from "../store/authStore";
import { createRouter, createWebHistory } from "vue-router";

// Admin routes
export const adminRoutes = [
  {
    path: "/",
    name: "AdminDashboard",
    component: () => import("../components/AdmnPanel.vue"),
    meta: { requiredGroup: "admin" },
    children: [
      {
        path: "/dashboard",
        name: "dashadmin",
        // component: () => import("../components/modal/delete.vue"),
        component: () => import("../views/Admin/dashboard.vue"),
        meta: { requiredGroup: "admin" },
      },
      {
        path: "/user-list",
        name: "userList",
        component: () => import("../views/Admin/userList.vue"),
        meta: { requiredGroup: "admin" },
      },
      {
        path: "/access",
        name: "access-control",
        component: () => import("../views/Admin/accessChange.vue"),
        meta: { requiredGroup: "admin" },
      },
      {
        path: "/user/:id",
        name: "user",
        component: () => import("../views/Admin/user.vue"),
        meta: { requiredGroup: "admin" },
      },
    ],
  },
];

// User routes
export const userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/pages/dashboard.vue"),
    meta: { requiredGroup: "user" },
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/pages/filesimport.vue"),
    meta: { requiredGroup: "user" },
  },
  {
    path: "/login",
    component: () => import("../views/auth/loginPage.vue"),
    meta: { requiredGroup: "user" },
  },
  {
    path: "/403",
    component: () => import("../views/responses/403.vue"),
    meta: { requiredGroup: "user" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/responses/404.vue"),
    meta: { requiredGroup: "user" },
  },
  {
    path: "/companies",
    name: "CompanyList",
    component: () => import("../views/pages/company.vue"),
    meta: { requiredGroup: "user" },
  },
  {
    path: "/company/:companyId",
    name: "CompanyDetail",
    component: () => import("../views/pages/mineralYear.vue"),
    meta: { requiredGroup: "user" },
    props: true,
  },
  {
    path: "/contributions/:companyId",
    name: "contributes",
    component: () => import("../views/pages/contribution.vue"),
    meta: { requiredGroup: "user" },
  },
];

// Public routes only
const publicRoutes = [
  {
    path: "/",
    name: "Home",
    // component: () => import("../components/AdmnPanel.vue"),
    component: () => import("../views/auth/loginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/registerPage.vue"),
  },
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("../views/responses/403.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/responses/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (
    authStore.groups.includes("admin") &&
    !router.hasRoute("AdminDashboard")
  ) {
    adminRoutes.forEach((route) => router.addRoute(route));
  }

  if (authStore.groups.includes("user") && !router.hasRoute("Dashboard")) {
    userRoutes.forEach((route) => router.addRoute(route));
  }

  if (
    to.meta.requiredGroup &&
    !authStore.groups.includes(to.meta.requiredGroup)
  ) {
    next({ name: "Forbidden" });
  } else {
    next();
  }
});

export default router;
