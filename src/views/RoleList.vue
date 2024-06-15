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
              class=" px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pl-10"
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
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center "
            >
              No roles found.
            </td>
          </tr>
          <tr v-else v-for="(role, index) in roles" :key="index">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm pl-10">
              {{ role.role_name }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center flex-row"
            >
              <button
                @click="() => onEdit(role.id)"
                class="text-emerald-600 hover:text-emerald-900 mr-1 pr-2"
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
                @click="() => onDelete(role.id, role.role_name)"
                class="text-red-500 hover:text-red-700 ml-4"
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
 <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a @click="prevPage" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Previous</a>
      <a @click="nextPage" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing {{ ' ' }} <span class="font-medium">{{ start + 1 }}</span> {{ ' ' }} to {{ ' ' }} <span class="font-medium">{{ end }}</span> {{ ' ' }} of {{ ' ' }} <span class="font-medium">{{ totalItems }}</span> {{ ' ' }} results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a @click="prevPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" :class="{ 'bg-emerald-600 text-white': page === currentPage }">{{ page }}</span>
          <a @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
  </div>
  </div>
   <!-- Delete Confirmation Modal -->
   <DeleteConfirmationModal
    :show="showDeleteConfirm"
    @confirm-delete="confirmDelete"
    @close="showDeleteConfirm = false"
  />
  <router-view />
</template>
<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ref, computed, onMounted, watchEffect  } from 'vue';
import { useRouter } from 'vue-router';

import apiClient from '@/services/AxiosClient.js';
import { usePagination } from '@/composables/usePagination';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import store from '@/stores/index'; // Import the store

const router = useRouter();
const roles = ref([]); // Reactive variable to store role data
const showDeleteConfirm = ref(false);
const roleToDelete = ref(null);
const currentUserRole = store.state.role; // Get the current user's role

// Fetch role list from the backend API on component mount
const fetchData = async () => {
  try {
    const response = await apiClient.get('/role/list', {
      params: {
        page: currentPage.value,
      },
    });
    const data = response.data.Role;
    roles.value = data.slice(0, -1);
    const pageData = data[data.length - 1];
    totalPages.value = pageData.total_pages;
    currentPage.value = pageData.page;
    totalItems.value = pageData.total_roles;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);

onMounted(() => {
  fetchData();
});

const onCreate = () => {
  router.push('/create-role');
};

const onEdit = (roleId) => {
  router.push({ name: 'RoleEditView', params: { id: roleId } });
};

const onDelete = (roleId, roleName) => {
  if (roleName === currentUserRole) {
    alert("You are currently assigned this role. It cannot be deleted.");
    return;
  }
  roleToDelete.value = roleId;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  try {
    const response = await apiClient.delete(`/role/del/${roleToDelete.value}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    fetchData();
    showDeleteConfirm.value = false;
  } catch (error) {
    console.error("Error deleting role:", error);
  }
};


watchEffect(() => {
  fetchData();
});
</script>

<style scoped>
/* Your scoped styles here */
</style>
