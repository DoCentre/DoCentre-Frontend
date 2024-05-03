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
    path: "/editDoc/:id",
    name: "EditDoc",
    component: () => import("../views/temp.vue"),
    meta: {
      title: "Edit Document",
    },
  },
  {
    path: "/approveDoc/:id",
    name: "ApproveDoc",
    component: () => import("../views/temp.vue"),
    meta: {
      title: "Approve Document",
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
