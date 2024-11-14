<template>
    <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
  <div class="relative">
    <h3 class="mb-10 text-2xl font-medium text-gray-700">Billing</h3>
    <button @click="sendBills" :disabled="isLoading" class="absolute right-0 items-center px-4 py-2 text-white rounded-2xl top-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">
  <template v-if="isLoading">
    <svg class="inline-block w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Sending...
  </template>
  <template v-else>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-5 h-5 mr-2">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
    Send
  </template>
</button>


    <div class="mt-4 overflow-auto max-h-[700px] custom-scrollbar relative">
      <table class="w-full min-w-full text-sm leading-normal text-left text-md">
        <thead class="sticky-header">
          <tr>
            <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              <div class="flex items-center">
                <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="w-4 h-4" />
                <span class="ml-2">All</span>
              </div>
            </th>
            <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Room No</th>
            <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Total Bill</th>
            <th class="hidden px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 md:table-cell">Date Created</th>
            <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedUnits.length === 0">
            <td colspan="5" class="px-2 py-5 text-sm text-center bg-white border-b border-gray-200">No data found!</td>
          </tr>
          <tr v-else v-for="unit in paginatedUnits" :key="unit.id" class="transition-all duration-200 cursor-pointer" :class="[
                unit.selected ? 'bg-emerald-100 hover:bg-emerald-200!important border-l-4 border-emerald-500' : 'hover:bg-gray-100'
              ]">
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="unit.selected" :value="unit.id" class="w-4 h-4" role="checkbox" :aria-checked="unit.selected" />
            </td>
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">{{ unit.res_room }}</td>
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200 sm:table-cell">{{ unit.amount }}</td>
            <td class="hidden px-2 py-5 text-sm bg-white border-b border-gray-200 md:table-cell">{{ formatDate(unit.date_created) }}</td>
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
              <Popper hover placement="left">
                <button @click="editUnit(unit.unit_id)" class="mr-4 text-emerald-600 hover:text-emerald-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                  </svg>
                </button>
                <template #content>
                  <div>Update</div>
                </template>
              </Popper>
              <Popper hover placement="right">
                <button @click="onDelete(unit.id)" class="ml-4 text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
                <template #content>
                  <div class="text-red-600">Delete</div>
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
      Showing {{ start + 1 }} to {{ end }} of {{ totalItems }} results
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'; // Import Vuex store
import apiClient from '@/services/AxiosClient.js';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import { usePagination } from '@/composables/usePagination';
import ToastNotification from '@/components/ToastNotification.vue';


const router = useRouter();
const route = useRoute();
const store = useStore(); // Initialize Vuex store
const unitList = ref([]);
const selectAll = ref(false);
const showDeleteConfirm = ref(false); // State for showing delete confirmation modal
const unitToDelete = ref(null); // State for the unit to be deleted
const showImageModal = ref(false); // State for showing image modal
const currentImage = ref(''); // State for the current image URL
const waterCostInput = ref(store.getters.getWaterCost);
const rentCostInput = ref(store.getters.getRentCost);
const costPerUnit = ref(store.getters.getCostPerUnit);

const isLoading = ref(false);




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

const fetchData = async () => {
  try {
    console.log('Fetching bill data...');
    const response = await apiClient.get('/bill/list', {
      params: {
        page: currentPage.value,
      },
    });

    const data = response.data.Bills;
    if (Array.isArray(data) && data.length > 0) {
      const pageData = data[data.length - 1];
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = pageData.total_records ? pageData.total_records : pageData.total_bills;
      unitList.value = data.slice(0, -1).map(bill => ({
        ...bill,
        selected: false,
        res_room: bill.res_room, // Use res_room for room number
        unitImage: bill.unitImage || 'https://via.placeholder.com/600' // Add unitImage property
      }));
       // Add debug lines here
      console.log('start:', start.value);
      console.log('end:', end.value);
      console.log('totalItems:', totalItems.value);
    } else {
      unitList.value = [];
      totalPages.value = 0;
      totalItems.value = 0;
    }
    console.log('Bill data fetched successfully');
  } catch (error) {
    console.error('Error fetching bills:', error);
  }
};

const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);


onMounted(() => {
  fetchData();
});

const toggleSelectAll = () => {
  paginatedUnits.value.forEach(unit => unit.selected = selectAll.value);
};

const editUnit = (unitId) => {
  router.push({ name: 'UnitManagementUpdate', params: { id: unitId } });
};

const sendBills = async () => {
  const selectedUnits = unitList.value.filter(unit => unit.selected);
  if (selectedUnits.length === 0) {
    console.log('No unit selected. Please choose one to send the bill.');
    showToastMessage('No bill selected.', 'warning')
    return;
  }

  isLoading.value = true;

  try {
    if (selectedUnits.length === unitList.value.length) {
      console.log('Sending all bills...');
      await apiClient.post('/bill/send_all', {
        rent_cost: rentCostInput.value,
        water_cost: waterCostInput.value,
        cost_per_unit: costPerUnit.value,
      });
      await apiClient.delete('/bill/del_all');
    } else {
      for (const unit of selectedUnits) {
        console.log(`Sending bill for unit ID: ${unit.id}`);

        try {
          const response = await apiClient.post(`/bill/send/${unit.id}`, {
            rent_cost: rentCostInput.value,
            water_cost: waterCostInput.value,
            cost_per_unit: costPerUnit.value,
          });

          const billId = response.data.bill_id; // Ensure the response contains the bill_id
          if (!billId) {
            throw new Error('Bill ID is missing in the response');
          }

          // Prepare the payload for bill history
          const billHistoryPayload = {
            unit_id: unit.id,
            amount: unit.amount,
            date_sent: new Date().toISOString(),
            rent_cost: rentCostInput.value,
            water_cost: waterCostInput.value,
            cost_per_unit: costPerUnit.value
          };

          // Validate the payload
          if (!billHistoryPayload.amount || !billHistoryPayload.date_sent) {
            throw new Error('Invalid payload for bill history');
          }

          // Delete the bill record
          console.log(`Deleting bill for unit ID: ${unit.id}`);
          await apiClient.delete(`/bill/del/${unit.id}`);
        } catch (error) {
          console.error(`Error processing bill for unit ID ${unit.id}:`, error);
          continue; // Skip to the next unit
        }
      }
    }

    console.log('Bills sent successfully');
    showToastMessage('Bills send sucessfully!', 'success');
    localStorage.removeItem('selectedUnits');
    unitList.value = unitList.value.filter(unit => !unit.selected);
 
    
  } catch (error) {
    console.error('Error sending bills:', error);
    console.log('Failed to send bills. Please try again.');
    showToastMessage('Failed to send bills, Please try again', 'error');
  } finally {
    isLoading.value = false;
  }
};

// Computed property to filter valid units
const validUnits = computed(() => {
  return unitList.value.filter(unit => unit.id && unit.res_room && unit.date_created && unit.amount);
});

const paginatedUnits = computed(() => {
  return validUnits.value;
});

const onDelete = (unitId) => {
  unitToDelete.value = unitId;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  try {
    await apiClient.delete(`/bill/del/${unitToDelete.value}`);
    unitList.value = unitList.value.filter(unit => unit.id !== unitToDelete.value);
    showDeleteConfirm.value = false;
    console.log('Bill deleted successfully');
    showToastMessage('Bill deleted successfully!', 'success');
    showToastMessage
  } catch (error) {
    console.error('Error deleting bill:', error);
    showToastMessage('Failed to delete bill. please try again', 'error')
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

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.overflow-auto {
  overflow: auto;
}

.max-h-\[700px\] {
  max-height: 700px;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: gray; 
  border-radius: 10px; 
  border: 3px solid #f1f1f1; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: gray; 
}

.custom-scrollbar {
  scrollbar-width: thin; 
  scrollbar-color: gray #f1f1f1; 
}
</style>
