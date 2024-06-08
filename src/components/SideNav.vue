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
  
          </div>

          <!-- Display username and role -->
          <div class="text-center mb-4">
            <p class="text-sm font-medium">{{ username }}</p>
            <p class="text-xs text-gray-600">{{ role }}</p>
          </div>
           
          <div class="h-[50px]">
            <div class="flex items-center justify-between">
              <router-link to="/" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out">
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
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.getUser);
const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);
const showDropDown = ref(false);
const showSide = ref(true);
const showSuccessMessage = ref(false);
const showUserManagementDropdown = ref(false);

// hide show side bar
const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

// Handle window resize to auto-show/hide sidebar
const handleResize = () => {
  showSide.value = window.innerWidth >= 768;
};

// toggle user
const toggleDrop = () => {
  showDropDown.value = !showDropDown.value;
};

const toggleUserManagementDropdown = () => {
  showUserManagementDropdown.value = !showUserManagementDropdown.value;
};

const logout = () => {
  // Perform any logout logic here (e.g., clear user data, make API call)
  // Show the success message
  showSuccessMessage.value = true;
  // Redirect to login page
  router.push("/login");
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize(); // Check initial size
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
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
