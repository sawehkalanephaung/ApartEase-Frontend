<template>
  <h3 class="text-3xl font-medium text-gray-700">User Management</h3>
  <div class="mt-8">
    <h2 class="text-xl font-semibold leading-tight text-gray-700">User List</h2>
    <div class="mt-6 flex justify-between items-center">
      <div class="relative w-full max-w-md"></div>
      <button @click="onCreate" class="ml-3 bg-emerald-300 hover:bg-emerald-400 text-white px-4 py-2 rounded">
        <router-link to="/residentlist/add-room" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span class="ml-2">Create New</span>
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
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ user.username }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ user.has_admin_role[0].name }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button @click="() => onEdit(user.id)" class="text-emerald-600 hover:text-emerald-900 mr-2">Edit</button>
              <button @click="() => onDelete(user.id)" class="text-emerald-600 hover:text-emerald-900 ml-2">Delete</button>
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
import userService from '@/services/userService'

const users = ref([]) // Reactive variable to store user data

// Fetch user list from the backend API on component mount
onMounted(async () => {
  try {
    const userList = await userService.getUsers()
    users.value = userList
  } catch (error) {
    console.error(error)
  }
})
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