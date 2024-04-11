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
        },{
            path: '/testtoken',
            component: () => import('@/pages/TestToken.vue')
        }, {
            path: '/:pathMatch(.*)*',
            component: () => import('@/pages/NotFound.vue')
        }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/signin' || to.path === '/register') {
        next();
    } else {
        const token = localStorage.getItem('token');
        if (!token) {
            next('/signin');
        } else {
            next();
        }
    }
}

);

router.afterEach((to, from) => {
    console.log('after each');
    console.log(to);
    console.log(from);
}
);

export default router;
