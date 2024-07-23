<template>
  <h3 class="text-2xl font-medium text-gray-700 ml-0">Unit Management</h3>
  <div class="mt-6">

    <div class="mt-4 flex flex-col sm:flex-row justify-between items-left  sm:space-x-1">
      <button
          @click="onCreate"
          class="sm:w-60 md:w-60 sm:ml-0 md:ml-0 lg:ml-0 bg-primary hover:bg-emerald-400 text-white px-4 py-2 rounded mb-2 sm:mb-0 "
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
            class="border border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded lg:mr-2 md:mr-2 sm:mr-2 mb-2 sm:mb-0 "
            :disabled="selectedUnits.length === 0"
        >
          Update
        </button>
        <button
            @click="deleteAllSelected"
            class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
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
            <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-4 sm:h-4" />
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
            <input type="checkbox" v-model="selectedUnits" :value="u.id" class="lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-4 sm:h-4 " />
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <img :src="u.unitImage || 'https://via.placeholder.com/600'" alt="Unit Image" class="w-14 h-14 object-cover cursor-pointer" @click="openImageModal(u.unitImage)" />
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.res_room }}</td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <div :class="{'bg-green-500': u.approveStatus, 'bg-red-500': !u.approveStatus}" class="w-4 h-4 rounded-full mr-1 flex items-center justify-center">
                <svg v-if="u.approveStatus" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span>{{ u.approveStatus ? 'Approved' : 'Disapproved' }}</span>
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
  <!-- Image Modal -->
  <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeImageModal">
    <div class="relative bg-white rounded-lg shadow-lg max-w-full max-h-full p-4" @click.stop>
      <button @click="closeImageModal" class="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="mt-8">
        <img :src="currentImage || 'https://via.placeholder.com/700'" alt="Unit Image" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>

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
const showImageModal = ref(false);
const currentImage = ref('');

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
  router.push('/unit-management-create');
};

const onEdit = (id) => {
  router.push({ name: 'UnitManagementUpdate', params: { id } });
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
    // router.push({ name: 'UnitManagementUpdate', params: { id } });
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

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  currentImage.value = '';
};

watchEffect(() => {
  fetchData();
});
</script>

<style scoped>
/* Custom styles for the image modal */
.image-modal {
  max-width: 100%;
  max-height: 100%;
}
</style>
