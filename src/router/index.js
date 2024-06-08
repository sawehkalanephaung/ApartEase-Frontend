import { createRouter, createWebHistory } from 'vue-router'
import store from '@/stores/index'; 
import Login from '../components/UserLogin.vue'
import SideNav from '../components/SideNav.vue'
import ResidentList from '../views/ResidentList.vue'
import UserList from '../views/UserList.vue'
import ResidentCreateView from '@/views/ResidentCreateView.vue'
import ResidentEditView from '../views/ResidentEditView.vue'
import UserCreateView from '../views/UserCreateView.vue'
import UserEditView from '../views/UserEditView.vue'
import RoleList from '../views/RoleList.vue'
import RoleCreateView from '../views/RoleCreateView.vue'
import RoleEditView from '../views/RoleEditView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  
    {
      path: '/sidenav',
      name: 'SideNav',
      component: SideNav,
      children:[
        {
          path: '/residentlist',
          name: 'ResidentList',
          component: ResidentList,
      
        },
        {
          path: '/resident-create-view',
          name: 'ResidentCreateView',
          component: ResidentCreateView,
      
        },
        {
          path: '/resident-edit-view/:id',
          name: 'ResidentEditView',
          component: ResidentEditView,
      
        },
        {
          path: '/userlist',
          name: 'UserList',
          component: UserList,
        },
     
  
      {
      path: '/create-user',
      name: 'UserCreateView',
      component:  UserCreateView,

      },
      {
        path: '/edit-user/:id',
        name: 'UserEditView',
        component:  UserEditView,
  
        },
        {
          path: '/signup',
          name: 'SignupForm',
          component: SignupForm,
        },
        {
          path: '/rolelist',
          name: 'RoleList',
          component: RoleList,
        },
        {
          path: '/create-role',
          name: 'RoleCreateView',
          component: RoleCreateView,
        },
        {
          path: '/edit-role/:id',
          name: 'RoleEditView',
          component: RoleEditView,
        },
 

  
      ]
    }
  
  ]
})

// src/router/index.js
router.beforeEach((to, from, next) => {
  const isAdmin = store.state.role === 'admin';
  
  if (to.path === '/userlist' && !isAdmin) {
    // Redirect to the resident list page if the user is not an admin
    next('/residentlist');
  } else {
    next();
  }
});


export default router

