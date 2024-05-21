import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import SignupForm from '@/components/SignupForm.vue'
import SideNav from '../views/SideNavView.vue'
// import HomeView from '../views/HomeView.vue'
import ResidentList from '../views/ResidentList.vue'
import UserList from '../views/UserList.vue'




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
          path: '/userlist',
          name: 'UserList',
          component: UserList,
        },
      ]
     
    }
  
  ]
})

export default router

