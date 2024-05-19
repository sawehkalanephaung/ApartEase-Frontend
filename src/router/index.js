import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignupForm from '@/components/SignupForm.vue'
import SideNav from '../views/SideNavView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
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
    }
  
  ]
})

export default router

