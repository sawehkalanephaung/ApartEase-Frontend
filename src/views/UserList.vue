<template>
  <h3 class="text-3xl font-medium text-gray-700">User Management</h3>
  <div class="mt-8">
    <h2 class="text-xl font-semibold leading-tight text-gray-700">User List</h2>
    <div class="mt-6 flex justify-between items-center">
      <div class="relative w-full max-w-md"></div>
      <button @click="onCreate" class="ml-3 bg-primary hover:bg-emerald-400 text-white px-4 py-2 rounded">
        <router-link to="/userlist/create-user" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span class="ml-2">Create User</span>
        </router-link>
      </button>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">username</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">role</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Display a message if no users are found -->
          <tr v-if="!users || users.length === 0">
            <td colspan="4" class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">No users found.</td>
          </tr>
               <!-- Render user rows with pagination -->
          <tr v-else v-for="(user, index) in paginatedUsers" :key="index">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ user.username }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ user.has_admin_role[0].name }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
            >
              <button
                @click="() => onEdit(user.id)"
                class="text-text hover:text-emerald-500 mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </button>
              <button
                @click="() => onDelete(user.id)"
                class="text-text hover:text-red-500 ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination controls -->
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <a @click="prevPage" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Previous</a>
          <a @click="nextPage" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ start + 1 }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ end }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ users.length }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a @click="prevPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </a>
              <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" :class="{'bg-emerald-600 text-white': page === currentPage}">{{ page }}</span>
              <a @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import router from '@/router'
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL, API_TOKEN } from '@/config';

const users = ref([]) // Reactive variable to store user data

// Fetch user list from the backend API on component mount
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/list`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': API_TOKEN,
      },
    });
    users.value = response.data.Users;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});


const onCreate = () => {
  router.push('/create-user')

}

const onEdit = async (userId) => {
  router.push({ name: 'UserEditView', params: { id: userId } })
}




const onDelete = async (userId) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': API_TOKEN,
      },
      redirect: 'follow',
    };

    const response = await fetch(`${API_URL}/user/del/${userId}`, requestOptions);
    const result = await response.json();
    alert(result.message);

    // Optionally, you can update the users list after successful deletion
    users.value = users.value.filter((user) => user.id !== userId);
  } catch (error) {
    console.error(error);
  }
};



// Pagination configuration
const itemsPerPage = 5 // Number of items to display per page
const currentPage = ref(1) // Current page number

// Computed properties for pagination
const paginatedUsers = computed(() => users.value.slice(start.value, end.value))
const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage))
const start = computed(() => (currentPage.value - 1) * itemsPerPage)
const end = computed(() => Math.min(start.value + itemsPerPage, users.value.length))

// Function to navigate to previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Function to navigate to next page
const nextPage = () => {
  if (end.value < users.value.length) {
    currentPage.value++
  }
}

// Function to navigate to a specific page
const goToPage = (page) => {
  currentPage.value = page
}
</script>

<style scoped>
/* Your scoped styles here */
</style>