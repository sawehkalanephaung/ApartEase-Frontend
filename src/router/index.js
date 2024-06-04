import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/UserLogin.vue'
import SignupForm from '@/components/SignupForm.vue'

import SideNav from '../components/SideNav.vue'
import ResidentList from '../views/ResidentList.vue'
import UserList from '../views/UserList.vue'
import UserCreateView from '../views/UserCreateView.vue'
import UserEditView from '../views/UserEditView.vue'
import ResidentEditModal from '@/components/ResidentEditModal.vue'
import ResidentCreateModal from '@/components/ResidentCreateModal.vue'



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
          name: 'ResidentCreateModal',
          component: ResidentCreateModal,
      
        },
        {
          path: '/resident-edit-view/:id',
          name: 'ResidentEditView',
          component: ResidentEditModal,
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
  
      ]
    }
  
  ]
})

export default router

