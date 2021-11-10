import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
        path: '/settings/content-types',
        name: 'SContentTypes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/settings/ContentTypes.vue'),
    },
    {
        path: '/settings/spaces/add',
        name: 'SSpacesAdd',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/settings/AddSpace.vue'),
    },
    {
        path: '/settings/spaces',
        name: 'SSpaces',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/settings/Spaces.vue'),
    },
    {
        path: '/settings/languages/add',
        name: 'SLanguagesAdd',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/settings/AddLanguage.vue'),
    },
    {
        path: '/settings/languages',
        name: 'SLanguages',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/settings/Languages.vue'),
    },
    {
        path: '/content-types/:id',
        component: () => import(/* webpackChunkName: "content-type" */ '../views/ContentTypes.vue'),
    },
    {
        // will match everything
        path: '*',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
