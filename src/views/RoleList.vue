<template>
<ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
<div class="flex flex-col items-start justify-between mb-10 sm:flex-row">
  <h3 class="text-2xl font-medium text-gray-700">Role List</h3>

  <div class="mt-6 sm:mt-0">
    <button
      @click="onCreate"
        class="w-full px-4 py-2 text-white rounded-2xl sm:w-auto bg-primary hover:bg-emerald-600"
    >
      <span class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span class="flex-initial">Add New</span>
      </span>
    </button>
  </div>
</div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 pl-10 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 "
            >
              Role Name
            </th>
            <th
              class="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!roles || roles.length === 0">
            <td
              colspan="2"
              class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200 "
            >
              No roles found.
            </td>
          </tr>
          <tr v-else v-for="(role, index) in roles" :key="index">
            <td class="px-5 py-5 pl-10 text-sm bg-white border-b border-gray-200">
              {{ role.role_name }}
            </td>
            <td
              class="flex-row px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
            >
              <button
                @click="() => onEdit(role.id)"
                class="pr-2 mr-1 text-emerald-600 hover:text-emerald-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
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
                class="ml-4 text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
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
 <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
    <div class="flex justify-between flex-1 sm:hidden">
      <a @click="prevPage" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">Previous</a>
      <a @click="nextPage" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing {{ ' ' }} <span class="font-medium">{{ start + 1 }}</span> {{ ' ' }} to {{ ' ' }} <span class="font-medium">{{ end }}</span> {{ ' ' }} of {{ ' ' }} <span class="font-medium">{{ totalItems }}</span> {{ ' ' }} results
        </p>
      </div>
      <div>
        <nav class="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
          <a @click="prevPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 cursor-pointer rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
          </a>
          <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" :class="{ 'bg-emerald-600 text-white': page === currentPage }">{{ page }}</span>
          <a @click="nextPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 cursor-pointer rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
          </a>
        </nav>
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

  <!-- Create Role Modal -->
  
  <RoleCreateModal
  :show="showCreateModal"
  @close="closeCreateModal"
/>

  
  <!-- Update Role Modal -->
  <RoleEditModal
    :show="showEditModal"
    :roleId="selectedRoleId"
    @close="closeEditModal"
  />
  
  <router-view />
</template>
<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ref, computed, onMounted, watchEffect  } from 'vue';
import { useRouter } from 'vue-router';
import RoleEditModal from '@/components/RoleEditModal.vue';

import apiClient from '@/services/AxiosClient.js';
import { usePagination } from '@/composables/usePagination';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import store from '@/stores/index'; // Import the store
import RoleCreateModal from '@/components/RoleCreateModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';


const router = useRouter();
const roles = ref([]); // Reactive variable to store role data
const showDeleteConfirm = ref(false);
const roleToDelete = ref(null);
const currentUserRole = store.state.role; // Get the current user's role
const showCreateModal = ref(false);


const showEditModal = ref(false);
const selectedRoleId = ref(null);


const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};



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

// const onCreate = () => {
//   router.push('/create-role');
// };

const onCreate = () => {
  showCreateModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
  fetchData(); // Refresh the data after creating
};


// const onEdit = (roleId) => {
//   router.push({ name: 'RoleEditView', params: { id: roleId } });
// };


const onEdit = (roleId) => {
  selectedRoleId.value = roleId;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  fetchData();
};


const onDelete = (roleId, roleName) => {
  if (roleName === currentUserRole) {
    console.log("You are currently assigned this role. It cannot be deleted.");
    showToastMessage('You are currently assigned this role. It cannot be deleted.', 'warning');
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
    showToastMessage('User deleted successfully!', 'success');
  } catch (error) {
    console.error("Error deleting role:", error);
    showToastMessage('Error deleting user.', 'error');
  }
};


watchEffect(() => {
  fetchData();
});
</script>

<style scoped>
/* Your scoped styles here */
</style>
