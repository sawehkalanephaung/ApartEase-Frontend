<template>
    <div class="flex flex-col">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <h3 class="ml-0 text-2xl font-medium text-gray-700">Unit Management</h3>
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
    <label for="costPerUnit" class="mr-2">Cost Per Unit:</label>
    <input
      id="costPerUnit"
      v-model="costPerUnit"
      type="number"
      class="w-20 px-2 py-1 border border-gray-300 rounded-md"
      @change="updateCostPerUnit"
    />
  </div>
  <button @click="sendUnits" class="px-4 py-2 text-white rounded bg-primary hover:bg-emerald-400">
    Send Units
  </button>
</div>

    </div>
              
    <div class="mt-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
        <!-- Search Bar -->
        <div class="relative flex-grow sm:flex-grow-0 sm:w-64">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
      </div>
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search by Room Number..."
    class="w-full px-4 py-2 pl-8 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    @keyup.enter="searchUnit"
  />
  <div v-if="searchQuery" class="absolute inset-y-0 right-0 flex items-center pr-3">
    <button @click="clearSearch" class="text-gray-400 hover:text-gray-600">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</div>
      <!--filter by status-->
      <div class="flex-grow sm:flex-grow-0">
    <select id="statusFilter" v-model="statusFilter" @change="filterUnits" class="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
      <option value="all">Status</option>
      <option value="approved">Approved</option>
      <option value="disapproved">Disapproved</option>
    </select>
  </div>
      <!-- Add the button for sending units -->
      <div class="flex items-center space-x-2">

        <DatePicker v-model="startDate" @update:modelValue="handleStartDateChange" :format="dateFormat" class="w-10">
          <template #default="{ inputValue, togglePopover }">
            <div @click="togglePopover">
              <span>Start: </span>
              <span>{{ inputValue }}</span>
            </div>
          </template>
        </DatePicker>
        <DatePicker v-model="endDate" @update:modelValue="handleEndDateChange" :format="dateFormat" class="w-10">
          <template #default="{ inputValue, togglePopover }">
            <div @click="togglePopover">
              <span>End: </span>
              <span>{{ inputValue }}</span>
            </div>
          </template>
        </DatePicker>
      </div>
      
      </div>
  
    </div>
    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full leading-normal text-md">
        <thead>
          <tr>
            <!-- Add checkbox here -->
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
        </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Unit Image </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Room No </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Status </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Date </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Action</th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="u in filteredUnits" :key="u.id">
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <input type="checkbox" v-model="u.selected" :value="u.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
        </td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <img :src="u.unitImage || 'https://via.placeholder.com/600'" alt="Unit Image" class="object-cover cursor-pointer w-14 h-14" @click="openImageModal(u.unitImage)" />
      </td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.res_room }}</td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div class="flex items-center">
          <div :class="{'bg-emerald-500': u.approveStatus, 'bg-red-500': !u.approveStatus}" class="flex items-center justify-center w-4 h-4 mr-1 rounded-full">
            <svg v-if="u.approveStatus" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a 1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <span>{{ u.approveStatus ? 'Approved' : 'Disapproved' }}</span>
        </div>
      </td>
      <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ formatDate(u.date) }}</td>
      <td class="flex-row px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
        <button @click="() => onEdit(u.id)" class="mr-1 text-emerald-600 hover:text-emerald-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
          </svg>
        </button>
        <button @click="() => onDelete(u.id)" class="ml-1 text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
              <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" :class="{ 'bg-emerald-600 text-white': page === currentPage }">{{ page }}</span>
              <a @click="nextPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 cursor-pointer rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
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
  <!-- Image Modal -->
  <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeImageModal">
    <div class="relative max-w-full max-h-full p-4 bg-white rounded-lg shadow-lg" @click.stop>
      <button @click="closeImageModal" class="absolute text-gray-700 top-2 right-2 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="mt-8">
        <img :src="currentImage || 'https://via.placeholder.com/700'" alt="Unit Image" class="object-contain w-full h-full" />
      </div>
    </div>
  </div>

  <router-view />
</template>


<script setup>
import { ref, computed, onMounted, watchEffect, watch } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/services/AxiosClient.js';
import router from '@/router';
import { usePagination } from '@/composables/usePagination';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const units = ref([]);
const showDeleteConfirm = ref(false);
const unitsToDelete = ref(null);
const showImageModal = ref(false);
const currentImage = ref('');
const startDate = ref(null);
const endDate = ref(null);
const selectAll = ref(false);
const searchQuery = ref('');
const statusFilter = ref('all');

const store = useStore();
const costPerUnit = computed({
  get: () => store.getters.getCostPerUnit,
  set: (value) => store.dispatch('updateCostPerUnit', value),
});

const updateCostPerUnit = async () => {
  try {
    console.log('Updating cost per unit:', costPerUnit.value);
    units.value = units.value.map(unit => ({
      ...unit,
      costPerUnit: costPerUnit.value
    }));
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Cost per unit updated successfully');
  } catch (error) {
    console.error('Error updating cost per unit:', error);
  }
};
const fetchData = async () => {
  try {
    const response = await apiClient.get('/unit/list', {
      params: {
        page: currentPage.value,
        startDate: startDate.value,
        endDate: endDate.value,
      },
    });
    const data = response.data.Unit;
    statusFilter.value = 'all'; // Reset status filter when fetching all data

    if (Array.isArray(data) && data.length > 0) {
      const pageData = data[data.length - 1];
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = pageData.total_record;
      units.value = data.slice(0, -1);
      costPerUnit.value = data[0].costPerUnit; // Update the cost per unit
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

const toggleSelectAll = () => {
  filteredUnits.value.forEach(unit => unit.selected = selectAll.value);
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  currentImage.value = '';
};

const handleStartDateChange = (date) => {
  startDate.value = date;
  fetchData();
};

const handleEndDateChange = (date) => {
  endDate.value = date;
  fetchData();
};

const filteredUnits = computed(() => {
  let filtered = units.value;

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(unit => 
      (statusFilter.value === 'approved' && unit.approveStatus) ||
      (statusFilter.value === 'disapproved' && !unit.approveStatus)
    );
  }

  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    filtered = filtered.filter(unit => {
      const unitDate = new Date(unit.date);
      return unitDate >= start && unitDate <= end;
    });
  }

  return filtered;
});


const searchUnit = async () => {
  try {
    const response = await apiClient.get(`/unit/list/room?query=${searchQuery.value}&page=1`);
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
    console.error('Error searching unit:', error);
    units.value = [];
    totalPages.value = 1;
    totalItems.value = 0;
  }
};

const filterUnits = () => {
  if (statusFilter.value === 'all') {
    fetchData();
  } else {
    const filteredUnits = units.value.filter(unit => 
      (statusFilter.value === 'approved' && unit.approveStatus) ||
      (statusFilter.value === 'disapproved' && !unit.approveStatus)
    );
    units.value = filteredUnits;
    totalItems.value = filteredUnits.length;
    totalPages.value = Math.ceil(totalItems.value / itemsPerPage);
    currentPage.value = 1;
  }
};


watchEffect(() => {
  fetchData();
});

// Watch for changes in searchQuery and fetch data if it's cleared
watch(searchQuery, (newQuery) => {
  if (newQuery === '') {
    fetchData();
  }
});
const clearSearch = () => {
  searchQuery.value = '';
  fetchData();
};


// Date format for the date picker
const dateFormat = 'MM/dd/yyyy';

const sendUnits = () => {
  const selectedUnits = filteredUnits.value.filter(unit => unit.selected).map(unit => ({
    id: unit.id,
    roomNumber: unit.res_room,
    unitsUsed: unit.extractionStatus - unit.numberOfUnits,
    totalBill: (unit.extractionStatus - unit.numberOfUnits) * unit.costPerUnit + unit.waterCost + unit.rentCost
  }));

  if (selectedUnits.length > 0) {
    const existingUnits = JSON.parse(localStorage.getItem('selectedUnits')) || [];
    const existingRoomNumbers = existingUnits.map(unit => unit.roomNumber);

    // Filter out units that already exist in the selectedUnits
    const newUnits = selectedUnits.filter(unit => !existingRoomNumbers.includes(unit.roomNumber));

    if (newUnits.length > 0) {
      const updatedUnits = [...existingUnits, ...newUnits];
      localStorage.setItem('selectedUnits', JSON.stringify(updatedUnits)); // Append units to local storage
      router.push({ 
        name: 'SendBill'
      });
    } else {
      alert('All selected units are already in the bill list.');
    }
  } else {
    alert('Please select at least one unit to send.');
  }
};

</script>


<style scoped>
/* Custom styles for the image modal */
.image-modal {
  max-width: 100%;
  max-height: 100%;
}
/* Custom styles for the DatePicker component */
.vue-datepicker {
  --dp-primary-color: #10b981; /* Change primary color to green */
  --dp-primary-hover-color: red; /* Change primary hover color to a darker green */
  --dp-primary-active-color: #047857; /* Change primary active color to an even darker green */
}

/* Custom styles for the button */
button {
  --tw-ring-color: #10b981; /* Change focus ring color to green */
}

button:hover {
  background-color: #d1fae5; /* Change hover background color to a light green */
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5); /* Change focus box shadow color to a semi-transparent green */
}
</style>
