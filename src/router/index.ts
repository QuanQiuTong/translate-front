import { createRouter, createWebHistory } from "vue-router";

import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
// import path from "path";
import Login from "@/pages/Login.vue";

const routes =
    [
        {
            path: '/', //name: 'MainPage',
            component: () => import('@/pages/MainPage.vue')
        }, {
            path: '/signin',
            component: () => import('@/pages/Login.vue')
        }, {
            path: '/register',
            component: () => import('@/pages/Register.vue')
        }, {
            path: '/profile',
            component: () => import('@/pages/Profile.vue')
        }, {
            path: '/test',
            component: () => import('@/pages/Test8080.vue')
        }, {
            path: '/:pathMatch(.*)*',
            component: () => import('@/pages/NotFound.vue')
        }

    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
