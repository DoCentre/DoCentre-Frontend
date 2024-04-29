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
      title: "SignUp",
    },
  },
  {
    path: "/login",
    name: "LoginSuccess",
    component: () => import("../views/LoginSuccess.vue"),
    meta: {
      title: "LoginSuccess",
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
