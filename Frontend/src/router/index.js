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
    name: "EditFileList",
    component: () => import("../views/EditDoc.vue"),
    meta: {
      title: "Edit Document",
    },
  },
  {
    path: "/approve",
    name: "ApproveFileList",
    component: () => import("../views/ApproveDoc.vue"),
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
