import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import { ElMessage } from "element-plus";
import { getUserInfo, removeStorage } from "../request/user";

const checkAuth = async (to, from, next) => {
  if (!localStorage.token) {
    next("/sign-in");
    ElMessage.warning({
      showClose: true,
      message: "Please Sign In First!",
    });
    return;
  }
  try {
    const res = await getUserInfo();
    console.log(res.data);
    if (res.data.code !== 0) throw 1;
    next();
  } catch (e) {
    removeStorage();
    next("/sign-in");
    ElMessage.warning("Token Expired, Please Sign In Again!");
  }
};

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/translate",
    // component: () => import("@/views/Main"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/UserInfo.vue"), // Profile,
    beforeEnter: checkAuth,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/translate",
    component: () => import("@/views/Translate.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/user",
    component: () => import("@/views/User.vue"),
  },
  {
    path: "/test",
    component: () => import("@/test/Test.vue"),
  },
  {
    path: "/preference",
    component: () => import("@/views/Preference.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/dictionary",
    component: () => import("@/views/Dictionary.vue"),
  },
  {
    path: "/sign-out",
    name: "Sign Out",
    beforeEnter: (to, from, next) => {
      removeStorage();
      next("/sign-in");
      ElMessage.success("Succeccfully Signed Out!");
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
