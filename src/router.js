import Vue from 'vue';
import Router from 'vue-router';
// import Heroes from '@/views/Heroes.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes',
    },
    {
      path: '/heroes',
      name: 'heroes',
      // component: Heroes,
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Heroes.vue'),
    },
    {
      path: '/villains',
      name: 'villains',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Villains.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
