import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores/index'; 
import Login from '../components/UserLogin.vue';
import Register from '../components/UserRegister.vue';
import SideNav from '../components/SideNav.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/sidenav",
      name: "SideNav",
      component: SideNav,
      children: [
        {
          path: "/home",
          name: "HomeView",
          component: HomeView,
        },
      ],
    },
  ],
});

export default router;
