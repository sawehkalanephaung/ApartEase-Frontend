<template>
    <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
  <div class="relative">
    <div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <h3 class="mb-4 text-2xl font-medium text-gray-700 sm:mb-0">Bill History</h3>
      <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <DatePicker 
              v-model="startDate" 
              @update:modelValue="handleStartDateChange" 
              :format="dateFormat" 
              :enable-time-picker="false"
              placeholder="Start Date"
              class="w-full sm:w-auto"
            >
              <template #default="{ inputValue, togglePopover }">
                <div @click="togglePopover" class="w-full cursor-pointer sm:w-auto">
                  <span>Start: </span>
                  <span>{{ inputValue || 'Select date' }}</span>
                </div>
              </template>
            </DatePicker>
            <DatePicker 
              v-model="endDate" 
              @update:modelValue="handleEndDateChange" 
              :format="dateFormat" 
              :enable-time-picker="false"
              placeholder="End Date"
              class="w-full sm:w-auto"
            >
              <template #default="{ inputValue, togglePopover }">
                <div @click="togglePopover" class="w-full cursor-pointer sm:w-auto">
                  <span>End: </span>
                  <span>{{ inputValue || 'Select date' }}</span>
                </div>
              </template>
            </DatePicker>
          </div>
    </div>
    <div class="mt-4 overflow-auto max-h-[700px] custom-scrollbar">
      <table class="min-w-full leading-normal text-md">
        <thead class="sticky-header">
          <tr>
            <!-- <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            <div class="flex items-center">
              <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
              <span class="ml-2">All</span>
            </div>
          </th> -->
            <th class="px-2 py-5 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Room Number</th>
            <th class="px-2 py-5 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Amount</th>
            <th class= "hidden px-2 py-5 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 md:table-cell">Date Sent</th>
            <th class="px-2 py-5 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedBillHistory.length === 0">
          <td colspan="6" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
            No data found!
          </td>
        </tr>
          <tr v-else v-for="record in paginatedBillHistory" :key="record.id"
              class="transition-all duration-200 cursor-pointer"
              :class="[
                record.selected ? 'bg-emerald-100 hover:bg-emerald-200!important border-l-4 border-emerald-500' : 'hover:bg-gray-100'
              ]">
              <!-- <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="record.selected" :value="record.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
            </td> -->
           
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">{{ record.res_room || 'Unknown' }}</td>
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">{{ record.amount }}</td>
            <td class="hidden px-2 py-5 text-sm bg-white border-b border-gray-200 md:table-cell" >{{ formatDate(record.date_sent) }}</td>
            <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
              <div class="flex space-x-4 justify-left">
                <Popper hover placement="left">
                  <button @click="viewUnit(record.id)" class="mr-2 text-emerald-600 hover:text-emerald-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <template #content>
                    <div>View details</div>
                  </template>
                </Popper>
                <Popper hover placement="right"> 
                  <button @click="deleteUnit(record.id)" class="ml-2 text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  <template #content>
                    <div>Delete</div>
                  </template>
                </Popper>
              </div>
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
    <!-- Bill History Detail Modal -->
    <BillHistoryDetailModal
      :show="showBillHistoryDetailModal"
      :billId="selectedBillId"
      @close="closeBillHistoryDetailModal"
    />
 
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
  </div>



</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/AxiosClient.js';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { usePagination } from '@/composables/usePagination';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue'; 
import BillHistoryDetailModal from '@/components/BillHistoryDetailModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';


const billHistory = ref([]);
const startDate = ref(null);
const endDate = ref(null);
const itemsPerPage = 10; // Define itemsPerPage
const router = useRouter();
const dateFormat = "yyyy-MM-dd"; 
const showImageModal = ref(false);
const currentImage = ref('');
const selectAll = ref(false);
const showDeleteConfirm = ref(false); // State variable for delete confirmation modal
const recordToDelete = ref(null); // State variable to store the record to be deleted

const showBillHistoryDetailModal = ref(false);
const selectedBillId = ref(null);


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
    const response = await apiClient.get('/bill/history/list', {
      params: {
        page: currentPage.value,
      },
    });
    const data = response.data.BillHistory;
    if (Array.isArray(data) && data.length > 0) {
      const pageData = data[data.length - 1];
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = pageData.total_records;
      billHistory.value = data.slice(0, -1).map(record => ({
        ...record,
        res_room: record.res_room || 'Unknown', // Ensure res_room is set
        selected: false,
        unitImage: record.unitImage || 'https://via.placeholder.com/600'

      }));
    } else {
      billHistory.value = [];
      totalPages.value = 0;
      totalItems.value = 0;
    }
  } catch (error) {
    console.error('Error fetching bill history:', error);
  }
};

onMounted(() => {
  fetchData();
});

const handleStartDateChange = (date) => {
  startDate.value = date;
  fetchDataByDate();
};

const handleEndDateChange = (date) => {
  endDate.value = date;
  fetchDataByDate();
};
const fetchDataByDate = async () => {
  if (startDate.value && endDate.value) {
    try {
      const response = await apiClient.get('/bill/history/date', {
        params: {
          start: startDate.value,
          end: endDate.value,
          page: currentPage.value,
        },
      });
      const data = response.data.BillHistory;
      if (Array.isArray(data) && data.length > 0) {
        const pageData = data[data.length - 1];
        totalPages.value = pageData.total_pages;
        currentPage.value = pageData.page;
        totalItems.value = pageData.total_record;
        billHistory.value = data.slice(0, -1).map(record => ({
          ...record,
          res_room: record.res_room || 'Unknown' // Ensure res_room is set
        }));
      } else {
        billHistory.value = [];
        totalPages.value = 0;
        totalItems.value = 0;
      }
    } catch (error) {
      console.error('Error fetching unit history by date:', error);
    }
  }
};
onMounted(() => {
  fetchData();
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// const viewUnit = (id) => {
//   router.push({ name: 'BillHistoryDetail', params: { id } });
// };


const viewUnit = (id) => {
  selectedBillId.value = id;
  showBillHistoryDetailModal.value = true;
};

const closeBillHistoryDetailModal = () => {
  showBillHistoryDetailModal.value = false;
};


const deleteUnit = (id) => {
  recordToDelete.value = id;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  try {
    await apiClient.delete(`/bill/history/del/${recordToDelete.value}`);
    billHistory.value = billHistory.value.filter(unit => unit.id !== recordToDelete.value);
    showDeleteConfirm.value = false;
    console.log('Unit history record deleted successfully!');
    showToastMessage('Unit History record deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting unit history record:', error);
    showToastMessage('Failed to delete unit history record. Please try again', 'error');
  }
};


// Computed property to filter valid unit history entries
const validBillHistory = computed(() => {
  return billHistory.value.filter(unit => unit.id && unit.res_room && unit.amount && unit.date_sent);
});

const filteredBillHistory = computed(() => {
  let filtered = validBillHistory.value;

  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    filtered = filtered.filter(unit => {
      const unitDate = new Date(unit.date_sent);
      return unitDate >= start && unitDate <= end;
    });
  }

  return filtered;
});

const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);

const paginatedBillHistory = computed(() => {
  return filteredBillHistory.value;
});

const toggleSelectAll = () => {
  paginatedBillHistory.value.forEach(record => record.selected = selectAll.value);
};

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl || 'https://via.placeholder.com/700';
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  currentImage.value = '';
};


</script>

<style scoped>
::v-deep .dp__active {
  background-color: #10b981 !important;
}

::v-deep .dp__active_date {
  background-color: #10b981 !important;
}

::v-deep .dp__range_start, ::v-deep .dp__range_end {
  background-color: #10b981 !important;
}

::v-deep .dp__range_between {
  background-color: #a7f3d0 !important;
}


::v-deep .dp__action_button{
 height: 30px;
 width: auto;
 margin-right: 0.5rem;
border-radius: 10px;
}

::v-deep .dp__action_select {
  background-color: #10b981 !important;
  color: white !important;
  border-color: #10b981 !important;
  
}

::v-deep .dp__action_select:hover {
  background-color: #059669 !important;
  border-color: #059669 !important;
}


</style>
