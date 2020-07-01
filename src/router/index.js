import Vue from 'vue';
import VueRouter from 'vue-router';

// import CreateMap from '@/views/CreateMap.vue';
import Maze from '@/views/Maze.vue';
import SecondKey from '@/views/SecondKey.vue';
import ThirdKey from '@/views/ThirdKey.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/secondKey',
  },
  {
    path: '/secondKey',
    name: 'SecondKey',
    component: SecondKey,
  },
  {
    path: '/maze',
    name: 'Maze',
    component: Maze,
  },
  {
    path: '/thirdKey',
    name: 'ThirdKey',
    component: ThirdKey,
  },
  // {
  //   path: '/createMap',
  //   name: 'CreateMap',
  //   component: CreateMap,
  // },
  {
    path: '*',
    redirect: '/secondKey',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
