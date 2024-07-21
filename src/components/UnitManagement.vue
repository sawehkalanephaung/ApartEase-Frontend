<template>
  <h3 class="text-2xl font-medium text-gray-700">Resident Management</h3>
  <div class="mt-4">
    <h2 class="text-lg font-semibold leading-tight text-gray-700">Unit Management</h2>
    <div class="mt-4 flex flex-col sm:flex-row justify-between items-left  sm:space-x-1">
      <button
          @click="onCreate"
          class="sm:w-60 md:w-60 sm:ml-0 md:ml-3 bg-primary hover:bg-emerald-400 text-white px-4 py-2 rounded mb-2 sm:mb-0 lg:w-60 lg:h-13"
      >
        <router-link to="/resident-create" class="flex sm:flex-row md:flex-row items-center ">
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
          <span class="flex-none w-32">New Unit</span>
        </router-link>
      </button>

      <div class="flex flex-col sm:flex-row sm:justify-end sm:space-x-1 ">
        <button
            @click="updateAllSelected"
            class="border border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded mb-2 sm:mb-0 lg:w-26 lg:h-12 sm:w-26 sm:h-12"
            :disabled="selectedUnits.length === 0"
        >
          Update
        </button>
        <button
            @click="deleteAllSelected"
            class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded lg:w-26 lg:h-12 sm:w-26 sm:h-12"
            :disabled="selectedUnits.length === 0"
        >
          Delete
        </button>
      </div>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table v-if="units.length > 0" class="min-w-full leading-normal text-md">
        <thead>
        <tr>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" />
          </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Unit Image </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Room No </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Status </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Date </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"> Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(u, index) in units" :key="index">
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <input type="checkbox" v-model="selectedUnits" :value="u.id" />
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <img :src="u.unitImage" alt="Unit Image" class="w-16 h-16 object-cover" />
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.res_room }}</td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <div :class="{'bg-green-500': u.approveStatus, 'bg-red-500': !u.approveStatus}" class="w-4 h-4 rounded-full mr-1"></div>
              <select
                  @change="toggleApproveStatus(u.id, $event)"
                  class="px-2 py-1 rounded"
              >
                <option :value="true" :selected="u.approveStatus">Approved</option>
                <option :value="false" :selected="!u.approveStatus">Disapproved</option>
              </select>
            </div>

          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ formatDate(u.date) }}</td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center flex-row">
            <button @click="() => onEdit(u.id)" class="text-emerald-600 hover:text-emerald-900 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button @click="() => onDelete(u.id)" class="text-red-500 hover:text-red-700 ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else class="text-center text-gray-500 mt-4">
        No data found.
      </div>

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
import { ref, onMounted, watchEffect } from 'vue';
import apiClient from '@/services/AxiosClient.js';
import router from '@/router';
import { usePagination } from '@/composables/usePagination';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';

const units = ref([]);
const showDeleteConfirm = ref(false);
const unitsToDelete = ref(null);
const selectedUnits = ref([]);
const selectAll = ref(false);

const fetchData = async () => {
  try {
    const response = await apiClient.get('/unit/list', {
      params: {
        page: currentPage.value,
      },
    });
    const data = response.data.Unit;

    if (Array.isArray(data) && data.length > 0) {
      const pageData = data[data.length - 1];
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = pageData.total_record;
      units.value = data.slice(0, -1);
    } else {
      units.value = [];
      totalPages.value = 0;
      totalItems.value = 0;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);

onMounted(() => {
  fetchData();
});

const onCreate = () => {
  router.push('/resident-create');
};

const onEdit = (id) => {
  router.push({ name: 'ResidentEditView', params: { id } });
};

const onDelete = (id) => {
  unitsToDelete.value = id;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  try {
    await apiClient.delete(`/unit/del/${unitsToDelete.value}`);
    fetchData();
    showDeleteConfirm.value = false;
  } catch (error) {
    console.error('Error deleting units:', error);
  }
};

const deleteAllSelected = async () => {
  try {
    await Promise.all(selectedUnits.value.map(id => apiClient.delete(`/unit/del/${id}`)));
    fetchData();
    selectedUnits.value = [];
    selectAll.value = false;
  } catch (error) {
    console.error('Error deleting selected units:', error);
  }
};

const updateAllSelected = async () => {
  try {
    await Promise.all(selectedUnits.value.map(id => {
      const unit = units.value.find(u => u.id === id);
      return apiClient.put(`/unit/update/${id}`, { approveStatus: !unit.approveStatus });
    }));
    fetchData();
  } catch (error) {
    console.error('Error updating selected units:', error);
  }
};

const uploadImage = async (unitId, event) => {
  const file = event.target.files[0];
  // Implement the logic to upload the image file
  console.log('Uploading image for unit:', unitId, file);
};

const toggleApproveStatus = async (unitId, event) => {
  const unit = units.value.find(u => u.id === unitId);
  unit.approveStatus = event.target.value === 'true';
  // Implement the logic to update the approve status in the backend
  console.log('Toggling approve status for unit:', unitId, unit.approveStatus);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUnits.value = units.value.map(unit => unit.id);
  } else {
    selectedUnits.value = [];
  }
};

watchEffect(() => {
  fetchData();
});
</script>

