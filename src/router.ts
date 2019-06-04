import Vue from 'vue';
import Router from 'vue-router';
import Master from './views/Master.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'master',
            component: Master,
        },
        {
            path: '/peer',
            name: 'Peer',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Peer.vue'),
        },
    ],
});
