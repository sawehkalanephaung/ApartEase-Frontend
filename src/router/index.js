import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import SignupForm from '@/components/SignupForm.vue'
import SideNav from '../views/SideNavView.vue'
import Dashboard from '@/views/Dashboard.vue'
import ResidentList from '../views/ResidentList.vue'
import UserList from '../views/UserList.vue'
import ResidentCreateView from '@/views/ResidentCreateView.vue'
import ResidentEditView from '../views/ResidentEditView.vue'





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
          path: '/dashboard',
          name: 'Dashboard',
          component:Dashboard,
        },
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
          name: 'SignupForm',
          component: SignupForm,
        },
      ]
    }
  
  ]
})

export default router

