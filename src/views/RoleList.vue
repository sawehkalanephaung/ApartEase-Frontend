<template>
  <h3 class="text-3xl font-medium text-gray-700">Role Management</h3>
  <div class="mt-8">
    <h2 class="text-xl font-semibold leading-tight text-gray-700">Role List</h2>
    <div class="mt-6 flex justify-between items-center">
      <div class="relative w-full max-w-md"></div>
      <button
        @click="onCreate"
        class="ml-3 bg-primary hover:bg-emerald-400 text-white px-4 py-2 rounded"
      >
        <router-link to="/create-role" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span class="ml-2">Create Role</span>
        </router-link>
      </button>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Role Name
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!roles || roles.length === 0">
            <td
              colspan="2"
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
            >
              No roles found.
            </td>
          </tr>
          <tr v-else v-for="(role, index) in paginatedRoles" :key="index">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ role.role_name }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
            >
              <button
                @click="() => onEdit(role.id)"
                class="text-emerald-600 hover:text-emerald-900 mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                @click="() => onDelete(role.id)"
                class="text-emerald-600 hover:text-emerald-900 ml-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
      <div
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      >
        <div class="flex flex-1 justify-between sm:hidden">
          <a
            @click="prevPage"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >Previous</a
          >
          <a
            @click="nextPage"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >Next</a
          >
        </div>
        <div
          class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
        >
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
              <span class="font-medium">{{ roles.length }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav
              class="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                @click="prevPage"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              >
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </a>
              <span
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                :class="{ 'bg-emerald-600 text-white': page === currentPage }"
                >{{ page }}</span
              >
              <a
                @click="nextPage"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              >
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ref, computed, onMounted } from 'vue';
import router from '@/router';
import apiClient from '@/services/AxiosClient.js';

import axios from 'axios';

const roles = ref([]); // Reactive variable to store role data

// Fetch role list from the backend API on component mount

const fetchData = async () => {
  try {
    const response = await apiClient.get('/role/list');
    roles.value = response.data.Role;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const onCreate = () => {
  router.push('/create-role');
};

const onEdit = (roleId) => {
  router.push({ name: 'RoleEditView', params: { id: roleId } });
};

const onDelete = async (roleId) => {
  try {
    const response = await apiClient.delete(`/role/del/${roleId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    // alert(response.data.message);
    fetchData();
  } catch (error) {
    console.error("Error deleting role:", error);
  }
};

// Pagination configuration
const itemsPerPage = 5; // Number of items to display per page
const currentPage = ref(1); // Current page number

// Computed properties for pagination
const paginatedRoles = computed(() =>
  roles.value.slice(start.value, end.value)
);
const totalPages = computed(() => Math.ceil(roles.value.length / itemsPerPage));
const start = computed(() => (currentPage.value - 1) * itemsPerPage);
const end = computed(() =>
  Math.min(start.value + itemsPerPage, roles.value.length)
);

// Function to navigate to previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Function to navigate to next page
const nextPage = () => {
  if (end.value < roles.value.length) {
    currentPage.value++;
  }
};

// Function to navigate to a specific page
const goToPage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
