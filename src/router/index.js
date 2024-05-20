import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupForm from '@/components/SignupForm.vue'
import SideNav from '../views/SideNavView.vue'
import HomeView from '../views/HomeView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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
          path: '/home',
          name: 'home',
          component:HomeView,
        }
      ]
     
    }
  
  ]
})

export default router

