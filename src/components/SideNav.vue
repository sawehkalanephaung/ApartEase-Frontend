
<template>
  <div class="flex w-screen h-screen">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-text" v-show="showSide">
      <div class="h-[50px] bg-primary flex justify-start items-center">
        <div class="px-[20px]">
          <router-link to="/home" class="text-xl font-bold">
            ApartEase
          </router-link>
        </div>
      </div>

      <div class="h-[calc(100vh-50px)] bg-primary py-[10px]">
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[20px]">
          <!--Side nav-->
          <div class="flex flex-col justify-between space-y-[20px]" >
            <!-- start Home -->
            <div :class="{ 'hidden': !showSide }" class="sidebar">
              <router-link to="/home" @click="handleNavClick" class="inline-flex relative items-center py-[10px] px-[10px] w-full lg:text-md md:text-base sm:text-xs font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out" exact-active-class="active-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                Home
              </router-link>
            </div>
            <!-- end home-->

            <!-- unit management-->
            <router-link to="/unit-management" @click="handleNavClick" class="inline-flex lg:text-md md:text-base sm:text-xs relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out" exact-active-class="active-link">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              <span>Unit Management</span>
            </router-link>
          <!-- unit management-->
   
               <!-- start bill Management Dropdown -->

              <div :class="{'active-link': isBillManagementActive}" class="relative rounded-md" @mouseover="showBillManagementDropdown = true" @mouseleave="showBillManagementDropdown = false">
                <div class="inline-flex relative items-center py-[10px] lg:text-md md:text-base sm:text-xs px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  Bill &  History
                  <svg v-if="showBillManagementDropdown" class="w-6 h-6 mt-0 ml-auto rotate-180 rounded-md tansform ttransition-transform lg:text-md md:text-base sm:text-xs" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                  
                  <svg v-else class="w-6 h-6 ml-auto transition-transform transform rotate-0 rounded-md" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
         
                </div>
                <transition name="fade">
                  <div v-show="showBillManagementDropdown" class="absolute left-0 z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <router-link to="/send-bill" @click="handleNavClick" class="flex items-center block px-4 py-2 font-medium text-gray-700 rounded-md lg:text-md md:text-base sm:text-xs hover:bg-gray-100 " exact-active-class="active-link">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                      <span>Bill</span>
                    </router-link>
                    <router-link to="/bill-history" @click="handleNavClick" class="flex items-center block px-4 py-2 text-sm font-medium text-gray-700 rounded-md lg:text-md md:text-base sm:text-xs hover:bg-gray-100 " exact-active-class="active-link">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Bill History</span>
                    </router-link>
                  </div>                
                </transition>
              </div>
            <!-- end bill Management Dropdown -->
             
                <!-- start upload image-->
            <router-link to="/upload-image" @click="handleNavClick" class="inline-flex lg:text-md md:text-base sm:text-xs relative items-center py-[10px] px-[10px] w-full text-sm rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out mt-[10px] font-medium " exact-active-class="active-link">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Upload
            </router-link>
            <!-- end  -->
         

            <!-- start Resident List -->

            <router-link to="/resident-list" @click="handleNavClick" class="inline-flex lg:text-md md:text-base sm:text-xs relative items-center py-[10px] px-[10px] w-full text-sm rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out mt-[10px] font-medium " exact-active-class="active-link">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              Resident
            </router-link>
            <!-- end of Resident Table -->
          


            <!-- start User Management Dropdown -->
            <div v-if="role === 'admin'  || role ==='Admin'" :class="{'active-link': isUserManagementActive}" class="relative" @mouseover="showUserManagementDropdown = true" @mouseleave="showUserManagementDropdown = false">
              <div class="inline-flex relative items-center py-[10px] px-[10px] w-full lg:text-md md:text-base sm:text-xs font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                User Management
                <svg v-if="showUserManagementDropdown" class="w-6 h-6 ml-auto transition-transform transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-6 h-6 ml-auto transition-transform transform rotate-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <transition name="fade">
                <div v-show="showUserManagementDropdown" class="absolute left-0 z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  <router-link to="/user-list" @click="handleNavClick" class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 lg:text-md md:text-base sm:text-xs " exact-active-class="active-link">User</router-link>
                  <router-link to="/role-list" @click="handleNavClick" class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 lg:text-md md:text-base sm:text-xs " exact-active-class="active-link">Role</router-link>
                </div>
              </transition>

            </div>
              <!-- end User Management Dropdown -->

          </div>

          <!-- customize login account-->
          <div class="container">
            <h2 id="title">Account</h2>
            <p id="userN"> Name:{{ username }}</p>
            <p id="userR">Role: {{ role }}</p>
          </div>

          <div class="h-[50px]">
            <div class="flex items-center justify-between ">
              <button @click="showLogoutConfirm = true" class="inline-flex relative items-center lg:text-md md:text-base sm:text-xs py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          <LogoutModal :show="showLogoutConfirm" @confirm-logout="logout" @close="showLogoutConfirm = false" />
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="w-full h-full bg-gray-400">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
        <!-- Add progress navigation bar to show the progress bar Eg. Resident List > Create resident -->
        <!-- Hamburger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[25px] h-[25px]">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32-32z" />
          </svg>
        </div>
        <!-- Breadcrumb -->
        <div class="ml-4 text-sm breadcrumbs lg:text-md md:text-base sm:text-xs">
          <ul>
            <li><a @click="navigateTo('home')">Home</a></li>
            <li v-if="breadcrumb.length > 1">{{ breadcrumb[1] }}</li>
          </ul>
        </div>
      </div>

      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <!-- Success message -->
          <div v-if="showSuccessMessage" class="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded" role="alert">
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline"> You have successfully logged out.</span>
          </div>
          <router-view />
        </div>
      </div>
    </div>
    <!-- Main -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import LogoutModal from '../components/LogoutModal.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();

const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);
const showDropDown = ref(false);
const showSide = ref(true);
const showSuccessMessage = ref(false);
const showUserManagementDropdown = ref(false);
const showLogoutConfirm = ref(false)
// breadcrumbs
const breadcrumb = ref(["Home"]);
const showBillManagementDropdown = ref(false);




const isBillManagementActive = computed(() => {
  return route.path === '/send-bill' || route.path === '/bill-history';
});

// hide show side bar
const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

// Handle window resize to auto-show/hide sidebar
const handleResize = () => {
  showSide.value = window.innerWidth >= 992;
  
};

const logout = () => {
  // Remove token and user from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Clear user data in Vuex store
  store.commit('setUser', null);
  store.commit('setJwtToken', null);

  // Show the success message
  showSuccessMessage.value = true;

  // Redirect to login page
  router.push("/login");
};

// add breadcrumbs
const navigateTo = (page) => {
  if (page === 'home') {
    router.push('/home');
  }
};

/**
 * Watches the route changes and updates the breadcrumb navigation accordingly.
 * The breadcrumb is updated based on the name of the current route.
 * This function ensures the breadcrumb accurately reflects the user's navigation.
 */
watch(route, (newRoute) => {
  if (newRoute.name === 'HomeView') {
    breadcrumb.value = ["Home"];
  } else if (newRoute.name === 'UserList') {
    breadcrumb.value = ["Home", "User List"];
  } else if (newRoute.name === 'RoleList') {
    breadcrumb.value = ["Home", "Role List"];
  } else if (newRoute.name === 'ResidentList') {
    breadcrumb.value = ["Home", "Resident Table"];
  } else if (newRoute.name === 'UnitManagement') {
  breadcrumb.value = ["Home", "Unit Management"];
  }else if (newRoute.name === 'UnitManagement') {
    breadcrumb.value = ["Home", "Unit Management"];
  } else if (newRoute.name === 'SendBill') {
    breadcrumb.value = ["Home", "Bill"];
  }else if (newRoute.name === 'BillHistory') {
    breadcrumb.value = ["Home", "Bill History"];
  }
// add more
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize(); // Check initial size
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// toggle user
const toggleDrop = () => {
  showDropDown.value = !showDropDown.value;
};

const toggleUserManagementDropdown = () => {
  showUserManagementDropdown.value = !showUserManagementDropdown.value;
};

// Determine if the current route is either "User" or "Role"
const isUserManagementActive = computed(() => {
  return route.path === '/user-list' || route.path === '/role-list';
});

// Determine if the current route is "BillHistory"
const isBillHistoryActive = computed(() => {
  return route.path === '/bill-history';
});

const handleNavClick = () => {
  if (window.innerWidth < 992) {
    showSide.value = false;
  }
};
</script>
<style>
/* ... (styles remain the same) ... */
</style>

<style>
/* Add your styles here */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.active-link {
  background-color: #e2e8f0; /* Example background color for active link */
  color: #1a202c; /* Example text color for active link */
}

.container{
  align-items: center;
  position: absolute;
  bottom: 100px;
  left: 16px;
  font-size: 16px;
  color:#1a202c;
}
#userN{
  position: relative;
  color: #1a202c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  left:20px;
}

#userR{
  position: relative;
  left:20px;
  color: #1a202c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;

}

@media (max-width: 767px) {
  #title {
    text-align: center;
    color: #1a202c;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    border-bottom: 1px solid #1a202c;
    width: 30%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #title {
    text-align: center;
    color: #1a202c;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 25px;
    border-bottom: 1px solid #1a202c;
    width: 20%;
  }
}

@media (min-width: 992px) {
  #title {
    padding: 10px;
    text-align: center;
    color: #1a202c;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    border-bottom: 1px solid #1a202c;
    width: 14%;
  }
}


</style>
