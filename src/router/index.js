import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores/index'; 
import UserLogin from '../components/UserLogin.vue';
import SideNav from '../components/SideNav.vue';
import HomeView from '@/views/HomeView.vue';

import UserList from '@/views/UserList.vue';
import RoleList from '@/views/RoleList.vue';
import UserCreateView from '@/views/UserCreateView.vue';
import UserEditView from '@/views/UserEditView.vue';
import RoleCreateView from '@/views/RoleCreateView.vue';
import RoleEditView from '@/views/RoleEditView.vue';
import ResidentList from '@/views/ResidentList.vue';
import ResidentCreateView from '@/views/ResidentCreateView.vue'; 

import ResidentEditView from '@/views/ResidentEditView.vue';
import UnitManagement from "@/components/UnitManagement.vue";
import UnitManagementCreate from "@/components/UnitManagementCreate.vue";
import UnitManagementUpdate from "@/components/UnitManagementUpdate.vue";
import { checkLoginStatus } from '@/utils/checkLoginStatus';
import SendBill from '@/components/SendBill.vue';
import BillHistory from '@/components/BillHistory.vue';
import UploadImage from '@/components/UploadImage.vue';
import BillHistoryDetail from '@/components/BillHistoryDetail.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLogin
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
          meta: { requiresAuth: true, roles: ['admin', 'Admin'] },
        },
        {
          path: "/create-user",
          name: "CreateUserView",
          component: UserCreateView,
          meta: { requiresAuth: true, roles: ['admin', 'Admin'] },
        },
        {
          path: "/user-edit/:id", 
          name: "UserEditView",
          component: UserEditView,
          meta: { requiresAuth: true, roles: ['admin','Admin'] },
        },
        {
          path: "/role-list",
          name: "RoleList",
          component: RoleList,
          meta: { requiresAuth: true, roles: ['admin','Admin'] },
        },

        {
          path: "/create-role",
          name: "RoleCreateView",
          component: RoleCreateView,
          meta: { requiresAuth: true, roles: ['admin','Admin'] },
        },
        {
          path: "/role-edit/:id", 
          name: "RoleEditView",
          component: RoleEditView,
          meta: { requiresAuth: true, roles: ['admin','Admin'] },
        },
        {
          path: "/resident-list",
          name: "ResidentList",
          component: ResidentList,
          meta: { requiresAuth: true},
        },
        {
          path: "/resident-create",
          name: "ResidentCreateView",
          component: ResidentCreateView,
          meta: { requiresAuth: true},
        },
        {
          path: "/resident-edit/:id", 
          name: "ResidentEditView",
          component: ResidentEditView,
          meta: { requiresAuth: true},
        },
   {
     path: "/unit-management",
         name: "UnitManagement",
       component: UnitManagement,
       meta: { requiresAuth: true},
   },
        {
          path: "/unit-management-create",
          name: "UnitManagementCreate",
          component: UnitManagementCreate,
          meta: { requiresAuth: true},
        },
        {
          path: "/unit-management-update/:id",
          name: "UnitManagementUpdate",
          component: UnitManagementUpdate,
          meta: { requiresAuth: true},
          props: true,
        },
        {
          path: '/send-bill',
          name: 'SendBill',
          component: SendBill,
          props: route => ({
            selectedUnits: route.query.selectedUnits,
            totalUnit: route.query.totalUnit,
            totalBill: route.query.totalBill
          })
        },
        
        {
          path: '/bill-history',
          name: 'BillHistory',
          component: BillHistory,
          meta: { requiresAuth: true },
        },
        {
          path: '/bill-history/:id',
          name: 'BillHistoryDetail',
          component: BillHistoryDetail,
          meta: { requiresAuth: true },
        },
        {
          path: "/upload-image",
          name: "UploadImage",
          component: UploadImage,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  checkLoginStatus();
  const token = localStorage.getItem('token');
  const userRole = store.state.role; // Access role from Vuex store state
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const roles = to.meta.roles;

  if (requiresAuth && !token) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else if (requiresAuth && roles && !roles.includes(userRole)) {
    // next({ name: 'login' }); // Redirect to home if not authorized
    next(false); // Prevent navigation if user does not have the required role
  } else {
    next(); // Proceed to the route
  }
  next();
});


// Add afterEach hook to hide sidebar on navigation
router.afterEach(() => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && window.innerWidth < 768) {
    sidebar.classList.add('hidden');
  }
});


export default router;
