import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
    meta: {
      title: "Sign Up",
    },
  },
  {
    path: "/edit",
    name: "EditDocList",
    component: () => import("../views/EditDocList.vue"),
    meta: {
      title: "Edit Document List",
    },
  },
  {
    path: "/approve",
    name: "ApproveDocList",
    component: () => import("../views/ApproveDocList.vue"),
    meta: {
      title: "Approve Document List",
    },
  },
  {
    path: "/view",
    name: "ViewDocList",
    component: () => import("../views/ViewDocList.vue"),
    meta: {
      title: "View Document List",
    },
  },
  {
    path: "/editDoc/:id",
    name: "EditDoc",
    component: () => import("../views/EditDoc.vue"),
    meta: {
      title: "Edit Document",
    },
  },
  {
    path: "/approveDoc/:id",
    name: "ApproveDoc",
    component: () => import("../views/ApproveDoc.vue"),
    meta: {
      title: "Approve Document",
    },
  },
  {
    path: "/viewDoc/:id",
    name: "ViewDoc",
    component: () => import("../views/ViewDoc.vue"),
    meta: {
      title: "View Document",
    },
  },
  {
    path: "/admin",
    name: "AdminView",
    component: () => import("../views/AdminView.vue"),
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/history",
    name: "DocHistory",
    component: () => import("../views/DocHistory.vue"),
    meta: {
      title: "Document History",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/showMetrics.vue"),
    meta: {
      title: "Dashboard",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
