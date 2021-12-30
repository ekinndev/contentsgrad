import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export default function init(store) {
    return new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/login',
                name: 'Login',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
            },
            {
                path: '/settings/content-types/add',
                name: 'SContentTypesAdd',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/settings/AddContentTypes.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/settings/content-types',
                name: 'SContentTypes',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/settings/ContentTypes.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },

            {
                path: '/settings/spaces/add',
                name: 'SSpacesAdd',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/settings/AddSpace.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/settings/spaces',
                name: 'SSpaces',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/settings/Spaces.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/settings/languages/add',
                name: 'SLanguagesAdd',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/settings/AddLanguage.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/settings/languages',
                name: 'SLanguages',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/settings/Languages.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/contents/:contentTypeId/add',
                component: () => import(/* webpackChunkName: "content-type" */ '../views/AddContent.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                path: '/:contentTypeName/contents/:contentTypeId',
                component: () => import(/* webpackChunkName: "content-type" */ '../views/Contents.vue'),
                beforeEnter(to, from, next) {
                    if (!store.state.account.user) return next('/login');
                    return next();
                },
            },
            {
                // will match everything
                path: '*',
                component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
            },
        ],
    });
}
