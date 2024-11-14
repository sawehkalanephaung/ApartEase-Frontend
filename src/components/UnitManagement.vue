<template>
   <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
  <div class="flex flex-col">
    <div class="flex flex-col sm:items-end sm:flex-row sm:justify-between">
      <h3 class="text-2xl font-medium text-gray-700">Unit Management</h3>
      <div class="flex items-center space-x-4">
        <popper hover placement="top">
        <button @click="sendUnits" class="flex items-center w-full px-4 py-2 mt-4 mr-4 text-white rounded-2xl sm:w-auto bg-primary hover:bg-emerald-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
            </svg>
            Move
        </button>
        <template #content>
      <div>Send units</div>
    </template>
      </popper>
      </div>
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
          class="w-full px-4 py-2 pl-8 pr-10 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
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
      <div class="relative flex-grow w-32 sm:flex-grow-0">
        <select id="statusFilter" v-model="statusFilter" @change="filterUnits" class="w-full px-4 py-2 mr-1 text-sm border border-gray-300 appearance-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="disapproved">Disapproved</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      <div class="flex items-center space-x-2">
      </div>
      <div class="flex items-center ml-auto">
          <label for="costPerUnit" class="mr-1">Cost Per Unit:</label>
          <input
            id="costPerUnit"
            v-model="costPerUnit"
            type="number"
            class="items-end w-20 px-4 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            @change="updateCostPerUnit"
          />
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
          <th class="hidden px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 md:table-cell"> Date </th>
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
          <td class="flex items-center gap-4 p-2 px-5 py-5 text-sm bg-white border-b border-gray-200 rounded">
            <img :src="u.imgUrl || 'https://via.placeholder.com/600'" alt="Unit Image" class="object-cover cursor-pointer w-14 h-14" @click="openImageModal(u.imgUrl)" />
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
          <td class="hidden px-5 py-5 text-sm bg-white border-b border-gray-200 md:table-cell">{{ formatDate(u.date) }}</td>
          <td class="flex-row px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
            <Popper hover placement="top">
              <button @click="() => onEdit(u.id)" class="mr-2 text-emerald-600 hover:text-emerald-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
                </svg>
              </button>
              <template #content>
                <div >Update</div>
              </template>
            </Popper>
            <Popper hover placement="top">
              <button @click="() => onDelete(u.id)" class="ml-2 text-red-500 hover:text-red-700">
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
      <div class="flex justify-between flex-1 mb-10 sm:hidden">
        <a @click="prevPage" class="absolute inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">Previous</a>
        <a @click="nextPage" class="absolute inline-flex items-center px-4 py-2 mr-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer right-4 hover:bg-gray-50">Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
            <p class="text-sm text-gray-700">
              Showing {{ ' ' }}
              <span class="font-medium">{{ start + 1 }}</span>
              {{ ' ' }} to {{ ' ' }}
              <span class="font-medium">{{ end || 0 }}</span>
              {{ ' ' }} of {{ ' ' }}
              <span class="font-medium">{{ totalItems || 0 }}</span>
              {{ ' ' }} results
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
  <div class="relative w-full max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg" @click.stop>
    <button @click="closeImageModal" class="absolute text-gray-700 top-2 right-2 hover:text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="flex items-center justify-center h-full">
      <img :src="currentImage || 'https://via.placeholder.com/700'" alt="Unit Image" class="object-contain max-w-full max-h-[80vh]" />
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
import ToastNotification from '@/components/ToastNotification.vue';

const units = ref([]);
const showDeleteConfirm = ref(false);
const unitsToDelete = ref(null);
const showImageModal = ref(false);
const currentImage = ref('');
const selectAll = ref(false);
const searchQuery = ref('');
const statusFilter = ref('all');
const imgUrl = ref('');



const store = useStore();
const costPerUnit = computed({
  get: () => store.getters.getCostPerUnit,
  set: (value) => store.dispatch('updateCostPerUnit', value),
});

const totalUnitsUsage = computed(() => store.getters.getTotalUnitUsage);
const totalBill = computed(() => store.getters.getTotalBill);





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


const updateCostPerUnit = async () => {
  try {
    console.log('Updating cost per unit:', costPerUnit.value);
    units.value = units.value.map(unit => ({
      ...unit,
      costPerUnit: costPerUnit.value
    }));
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Cost per unit updated successfully');
    showToastMessage('The cost per unit has been updated successfully and saved.');
  } catch (error) {
    console.error('Error updating cost per unit:', error);
    showToastMessage('Error updating cost per unit', 'error');
  }
};

const fetchData = async () => {

  try {
    const response = await apiClient.get('/unit/list', {
      params: {
        page: currentPage.value === 'all' ? 'all' : currentPage.value,
      },
    });
    console.log('API Response:', response.data);
    const data = response.data.Unit;
    if (Array.isArray(data) && data.length > 0) {
      const pageData = data[data.length - 1];
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = pageData.total_record;

      units.value = data.slice(0, -1).map(unit => ({
        ...unit,
        imgUrl: unit.imgUrl || 'https://via.placeholder.com/600',
        selected: selectAll.value
      }));
    }
  } catch (error) {
    console.error('Error fetching units:', error);
    // showToastMessage('Error fetching units', 'error');
  }
};


const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);

onMounted(() => {
  fetchData();
});

const toggleSelectAll = async () => {
  if (selectAll.value) {
    // Select all units across all pages
    const response = await apiClient.get('/unit/list', { params: { page: 'all' } });
    const allUnits = response.data.Unit.slice(0, -1);
    units.value = allUnits.map(unit => ({ ...unit, selected: true }));
  } else {
    // Deselect all units
    units.value = units.value.map(unit => ({ ...unit, selected: false }));
  }
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
    const response = await apiClient.delete(`/unit/del/${unitsToDelete.value}`);
    if (response.status === 200) {
      await fetchData();
      showDeleteConfirm.value = false;
      showToastMessage('Unit deleted successfully');
      window.location.reload(); // Refresh the page
    } else {
      throw new Error('Failed to delete unit');
    }
  } catch (error) {
    console.error('Error deleting units:', error);
    showToastMessage('Error deleting units', 'error');
  }
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const openImageModal = (imgUrl) => {
  currentImage.value = imgUrl;
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
    showToastMessage('No result found with this room number', 'info');
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
  let selectedUnits = units.value.filter(unit => unit.selected);

  if (selectAll.value) {
    // Fetch all units if "Select All" is checked
    const response = await apiClient.get('/unit/list', { params: { page: 'all' } });
    selectedUnits = response.data.Unit;
  }

  if (selectedUnits.length === 0) {
    console.log('Please select at least one unit.');
    showToastMessage('No unit selected.', 'warning')
    return;
  }

  // Filter out any non-unit objects (e.g., pagination info)
  selectedUnits = selectedUnits.filter(unit => unit.id !== undefined);

  // Debug: Log selected units and their approveStatus
  console.log('Selected units:', selectedUnits);
  selectedUnits.forEach(unit => {
    console.log(`Unit ID: ${unit.id}, Approve Status: ${unit.approveStatus}`);
    showToastMessage('The status is disapproved, change to approved', 'warning');
  });

  // Ensure approveStatus is correctly interpreted as a boolean
  const disapprovedUnits = selectedUnits.filter(unit => !Boolean(unit.approveStatus));
  if (disapprovedUnits.length > 0) {
    console.log('Disapproved Unit! Please check it');
    showToastMessage('The status is disapproved, change to approved', 'warning');
    return;
  }

  try {
    console.log('Sending selected units:', selectedUnits);
    await Promise.all(selectedUnits.map(async (unit) => {
      // Ensure all necessary properties are defined and properly converted to numbers
      const numberOfUnits = Number(unit.numberOfUnits);
      const prevNumberOfUnits = Number(unit.prevNumberOfUnits);
      const costPerUnit = store.getters.getCostPerUnit;
      const waterCost = store.getters.getWaterCost;
      const rentCost = store.getters.getRentCost;

      if (isNaN(numberOfUnits) || isNaN(prevNumberOfUnits) || isNaN(costPerUnit) || isNaN(waterCost) || isNaN(rentCost)) {
        console.error('Unit data is missing required properties or contains invalid values:', unit);
        console.log('Unit data is missing required properties or contains invalid values. Please check the unit data.');
        showToastMessage('Unit data is missing required properties or contains invalid values. Please check the unit data.', 'error');
        return;
      }

      // Calculate totalUnit and totalBill
      const totalUnit = numberOfUnits - prevNumberOfUnits;
      const totalBill = (totalUnit * costPerUnit) + waterCost + rentCost;

      // Add unit to bill
      const billData = {
        date_created: new Date().toISOString().split('T')[0],
        unit_id: unit.id,
        amount: totalBill,
        rent_cost: rentCost,
        water_cost: waterCost,
        cost_per_unit: costPerUnit
      };
      console.log('Sending bill data:', billData);
      showToastMessage('Sending bill data:', 'success');
      await apiClient.post(`/bill/add/${unit.id}`, billData);
    }));

    selectAll.value = false;

    const totalUnit = selectedUnits.reduce((total, unit) => total + (Number(unit.numberOfUnits) - Number(unit.prevNumberOfUnits)), 0);
    const totalBill = selectedUnits.reduce((total, unit) => total + ((Number(unit.numberOfUnits) - Number(unit.prevNumberOfUnits)) * store.getters.getCostPerUnit + store.getters.getWaterCost + store.getters.getRentCost), 0);

    // router.push({
    //   name: 'SendBill',
    //   query: {
    //     selectedUnits: JSON.stringify(selectedUnits),
    //     totalUnit,
    //     totalBill
    //   }
    // });
    console.log('Units sent successfully');
    showToastMessage('Move unit to Bill page successfully!', 'success');
  } catch (error) {
    console.error('Error sending units:', error);
    console.log('Failed to send units. Please try again.');
    showToastMessage('Failed to send units. Please try again.', 'error');
  }
};

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

</style>