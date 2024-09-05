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
        <popper hover placement="top">
        <button @click="sendUnits" class="px-4 py-2 ml-4 text-white rounded bg-primary hover:bg-emerald-700">
            Send
        </button>
        <template #content>
      <div>Send units</div>
    </template>
      </popper>
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
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="disapproved">Disapproved</option>
        </select>
      </div>
      <!-- Add the button for sending units -->
      <div class="flex items-center space-x-2">
      </div>
    </div>
  </div>
  <div class="mt-4 overflow-x-auto ">
    <div class="group">
    <table class="min-w-full leading-normal text-md">
      <thead>
        <tr>
          <!-- Add checkbox here -->
          <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            <div class="flex items-center">
              <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
              <span class="ml-2">All</span>
            </div>
          </th>
          <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Unit Image </th>
          <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Room No </th>
          <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Status </th>
          <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Date </th>
          <th class="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"> Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredUnits.length === 0">
          <td colspan="6" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
            No result found
          </td>
        </tr>
        <tr v-for="u in filteredUnits" :key="u.id" 
    class="transition-all duration-200 cursor-pointer"
    :class="[
      u.selected ? 'bg-emerald-100 hover:bg-emerald-200!important border-l-4 border-emerald-500' : 'hover:bg-gray-100'
    ]">
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <input type="checkbox" v-model="u.selected" :value="u.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
          </td>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <img :src="u.unitImage || 'https://via.placeholder.com/600'" alt="Unit Image" class="object-cover cursor-pointer w-14 h-14" @click="openImageModal(u.unitImage)" />
          </td>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.res_room }}</td>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div class="flex items-center">
              <div :class="{'bg-emerald-500': u.approveStatus, 'bg-yellow-500': !u.approveStatus}" class="flex items-center justify-center w-4 h-4 mr-1 rounded-full">
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
            <Popper hover placement="left">
              <button @click="() => onEdit(u.id)" class="mr-6 text-emerald-600 hover:text-emerald-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
                </svg>
              </button>
              <template #content>
                <div >Update</div>
              </template>
            </Popper>
            <Popper hover placement="right">
              <button @click="() => onDelete(u.id)" class="ml-6 text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
              <template #content>
                <div class="text-red-600 t ">Delete</div>
              </template>
            </Popper>
      </td>

        </tr>
      </tbody>
    </table>
  </div>

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
import '@vuepic/vue-datepicker/dist/main.css';
import Popper from 'vue3-popper';

const units = ref([]);
const showDeleteConfirm = ref(false);
const unitsToDelete = ref(null);
const showImageModal = ref(false);
const currentImage = ref('');
const selectAll = ref(false);
const searchQuery = ref('');
const statusFilter = ref('all');


const store = useStore();
const costPerUnit = computed({
  get: () => store.getters.getCostPerUnit,
  set: (value) => store.dispatch('updateCostPerUnit', value),
});

const totalUnitsUsage = computed(() => store.getters.getTotalUnitUsage);
const totalBill = computed(() => store.getters.getTotalBill);

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
    console.log('Fetching unit data...');
    await store.dispatch('fetchUnitData');
    const response = await apiClient.get('/unit/list', {
      params: {
        page: currentPage.value,
      },
    });
    const data = response.data.Unit;
    statusFilter.value = 'all';

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
    console.log('Unit data fetched successfully');
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

const filteredUnits = computed(() => {
  let filtered = units.value;

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(unit => 
      (statusFilter.value === 'approved' && unit.approveStatus) ||
      (statusFilter.value === 'disapproved' && !unit.approveStatus)
    );
  }

  return filtered;
});

const searchUnit = async () => {
  try {
    console.log('Searching unit with query:', searchQuery.value);
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
    console.log('Unit search completed successfully');
  } catch (error) {
    console.error('Error searching unit:', error);
    units.value = [];
    totalPages.value = 1;
    totalItems.value = 0;
  }
};

const filterUnits = computed(() => {
  let filtered = units.value;

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(unit => 
      (statusFilter.value === 'approved' && unit.approveStatus) ||
      (statusFilter.value === 'disapproved' && !unit.approveStatus)
    );
  }

  totalItems.value = filtered.length;
  totalPages.value = Math.ceil(totalItems.value / itemsPerPage);
  currentPage.value = 1;

  return filtered;
});

// ...


watchEffect(() => {
  fetchData();
});

watch(searchQuery, (newQuery) => {
  if (newQuery === '') {
    fetchData();
  }
});
const clearSearch = () => {
  searchQuery.value = '';
  fetchData();
};


const sendUnits = async () => {
  const selectedUnits = units.value.filter(unit => unit.selected);

  if (selectedUnits.length === 0) {
    alert('Please select at least one unit.');
    return;
  }

  const disapprovedUnits = selectedUnits.filter(unit => !unit.approveStatus);
  if (disapprovedUnits.length > 0) {
    alert('Disapproved Unit please double check');
    return;
  }

  if (selectedUnits.length > 0) {
    try {
      console.log('Sending selected units:', selectedUnits);
      await Promise.all(selectedUnits.map(async (unit) => {
        // Ensure all necessary properties are defined and properly converted to numbers
        const numberOfUnits = Number(unit.numberOfUnits);
        const prevNumberOfUnits = Number(unit.prevNumberOfUnits);
        const costPerUnit = store.getters.getCostPerUnit;
        const waterCost = store.getters.getWaterCost;
        const rentCost = getRentCostForUnit(unit.id);

        if (isNaN(numberOfUnits) || isNaN(prevNumberOfUnits) || isNaN(costPerUnit) || isNaN(waterCost) || isNaN(rentCost)) {
          console.error('Unit data is missing required properties or contains invalid values:', unit);
          alert('Unit data is missing required properties or contains invalid values. Please check the unit data.');
          return;
        }

        // Calculate totalUnit and totalBill
        const totalUnit = numberOfUnits - prevNumberOfUnits;
        const totalBill = totalUnit * costPerUnit + waterCost + rentCost;

        // Add unit to bill
        const billData = {
          date_created: new Date().toISOString().split('T')[0],
          unit_id: unit.id,
          amount: totalBill
        };
        console.log('Sending bill data:', billData);
        await apiClient.post(`/bill/add/${unit.id}`, billData);
      }));

      selectAll.value = false;

      const totalUnit = selectedUnits.reduce((total, unit) => total + (Number(unit.numberOfUnits) - Number(unit.prevNumberOfUnits)), 0);
      const totalBill = selectedUnits.reduce((total, unit) => total + ((Number(unit.numberOfUnits) - Number(unit.prevNumberOfUnits)) * store.getters.getCostPerUnit + store.getters.getWaterCost + getRentCostForUnit(unit.id)), 0);

      router.push({
        name: 'SendBill',
        query: {
          selectedUnits: JSON.stringify(selectedUnits),
          totalUnit,
          totalBill
        }
      });
      console.log('Units sent successfully');
    } catch (error) {
      console.error('Error sending units:', error);
      alert('Failed to send units. Please try again.');
    }
  }
};

// Helper functions to manage rent cost locally
function getRentCostForUnit(unitId) {
  const rentCost = localStorage.getItem(`rentCost_${unitId}`);
  return rentCost ? parseFloat(rentCost) : 3500; // default rent cost
}


onMounted(() => {
  fetchData();
});
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


tr:hover{
  background-color: red;
}
</style>