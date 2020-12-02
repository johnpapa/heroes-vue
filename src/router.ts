import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PageNotFound from '@/components/page-not-found.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/heroes',
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: () =>
      import(/* webpackChunkName: "heroes" */ './views/heroes/heroes.vue'),
  },
  {
    path: '/villains',
    name: 'villains',
    component: () =>
      import(
        /* webpackChunkName: "villains" */ './views/villains/villains.vue'
      ),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/about.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
