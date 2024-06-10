<template>
  <div class="w-screen h-screen flex">
    <!-- Side bar -->
    <div class="w-[300px] h-full bg-gray-200 text-text" v-show="showSide">
      <div class="h-[50px] bg-primary flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">ApartEase</h3>
        </div>
      </div>

      <div class="h-[calc(100vh-50px)] bg-primary py-[20px]">
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
          <div class="flex flex-col justify-between space-y-[10px]">
            <!-- Add router-link for Home -->
            <router-link to="/home" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out">
              <svg aria-hidden="true" class="w-[25px] h-[25px] fill-current mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
              </svg>
             Home
            </router-link>
            <router-link to="/resident-list" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25px] h-[25px] fill-current mr-2" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>

             Resident Table
            </router-link>


           <!-- User Management Dropdown -->
           <div  v-if="role === 'admin'"
           to="/user-list"  class="relative" @click="toggleUserManagementDropdown">
              <div class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                User Management
                <svg v-if="showUserManagementDropdown" class="w-4 h-4 ml-auto transition-transform transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-4 h-4 ml-auto transition-transform transform rotate-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <transition name="fade">
                <div v-show="showUserManagementDropdown" class="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <router-link to="/user-list" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User</router-link>
                  <router-link to="/role-list" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Role</router-link>
                </div>
              </transition>
          </div>
          </div>

          <div class="flex flex-col items-center mt-auto mb-4">
            <p class="text-sm font-medium">{{ username }}</p>
            <p class="text-xs text-gray-600">{{ role }}</p>
          </div>

          <div class="h-[50px]">
            <div class="flex items-center justify-between">
              <router-link to="/" @click="logout" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Logout
              </router-link>
            </div>
          </div>
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
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32 32z" />
          </svg>
        </div>
           <!-- Breadcrumb -->
           <div class="text-sm breadcrumbs ml-4">
          <ul>
            <li><a @click="navigateTo('home')">Home</a></li>
            <li v-if="breadcrumb.length > 1">{{ breadcrumb[1] }}</li>
          </ul>
        </div>
      </div>
      
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <!-- Success message -->
          <div v-if="showSuccessMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
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
import { ref, computed, onMounted, onUnmounted,watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute()

const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);
const showDropDown = ref(false);
const showSide = ref(true);
const showSuccessMessage = ref(false);
const showUserManagementDropdown = ref(false);
// breadcrumbs
const breadcrumb = ref(["Home"]);

// hide show side bar
const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

// Handle window resize to auto-show/hide sidebar
const handleResize = () => {
  showSide.value = window.innerWidth >= 768;
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
  router.push("/");
};

// add breadcrumbs
const navigateTo = (page) => {
  if (page === 'home') {
    router.push('/home');
  }
};

watch(route, (newRoute) => {
  if (newRoute.name === 'HomeView') {
    breadcrumb.value = ["Home"];
  } else if (newRoute.name === 'UserList') {
    breadcrumb.value = ["Home", "User List"];
  } else if (newRoute.name === 'RoleList') {
    breadcrumb.value = ["Home", "Role List"];
  } else if (newRoute.name === 'ResidentList') {
    breadcrumb.value = ["Home", "Resident List"];
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
</style>
