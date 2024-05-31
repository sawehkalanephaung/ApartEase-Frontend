import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/UserLogin.vue'
import SignupForm from '@/components/SignupForm.vue'
import SideNav from '../components/SideNav.vue'
import ResidentList from '../views/ResidentList.vue'
import UserList from '../views/UserList.vue'
import ResidentCreateView from '@/views/ResidentCreateView.vue'
import ResidentEditView from '../views/ResidentEditView.vue'
import UserCreateView from '../views/UserCreateView.vue'
import UserEditView from '../views/UserEditView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
       {
          path: '/signup',
          name: 'SignupForm',
          component: SignupForm,
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
        path: '/edit-user',
        name: 'UserEditView',
        component:  UserEditView,
  
        },
      ]
    }
  
  ]
})

export default router

