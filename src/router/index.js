import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores/index'; 
import Login from '../components/UserLogin.vue';
import Register from '../components/UserRegister.vue';
import SideNav from '../components/SideNav.vue';
import HomeView from '@/views/HomeView.vue';

import UserList from '@/views/UserList.vue';
import RoleList from '@/views/RoleList.vue';



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
      meta: { requiresAuth: true},
      children: [
        {
          path: "/home",
          name: "HomeView",
          component: HomeView,
          meta: { requiresAuth: true},
        },
        {
          path: "/user-list",
          name: "UserList",
          component: UserList,
          meta: { requiresAuth: true, roles: ['admin'] },
        },
        {
          path: "/role-list",
          name: "RoleList",
          component: RoleList,
          meta: { requiresAuth: true, roles: ['admin'] },
        },
      ],
    },
  ],
});
// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = store.state.role; // Access role from Vuex store state
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const roles = to.meta.roles;

  if (requiresAuth && !token) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else if (requiresAuth && roles && !roles.includes(userRole)) {
    next({ name: 'login' }); // Redirect to home if not authorized
  } else {
    next(); // Proceed to the route
  }
});

export default router;
