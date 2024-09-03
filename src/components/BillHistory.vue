<template>
  <div class="relative">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-medium text-gray-700">Bill History</h3>
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
    <div class="mt-4 overflow-auto max-h-[700px] custom-scrollbar">
      <table class="min-w-full leading-normal text-md">
        <thead class="sticky-header">
          <tr>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            <div class="flex items-center">
              <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
              <span class="ml-2">All</span>
            </div>
          </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Image</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Room Number</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Amount</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Date Sent</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Actions</th>
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
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="record.selected" :value="record.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <img :src="record.unitImage || 'https://via.placeholder.com/600'" alt="Unit Image" class="object-cover cursor-pointer w-14 h-14" @click="openImageModal(record.unitImage)" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ record.res_room || 'Unknown' }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ record.amount }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ formatDate(record.date_sent) }}</td>
            <td class="flex-row px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
              <button @click="editUnit(record.id)" class="mr-1 text-emerald-600 hover:text-emerald-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button @click="deleteUnit(record.id)" class="ml-1 text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
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

const billHistory = ref([]);
const startDate = ref(null);
const endDate = ref(null);
const itemsPerPage = 10; // Define itemsPerPage
const router = useRouter();
const dateFormat = "yyyy-MM-dd"; 
const showImageModal = ref(false);
const currentImage = ref('');
const selectAll = ref(false);

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

const editUnit = (id) => {
  router.push({ name: 'BillHistoryUpdate', params: { id } });
};

const deleteUnit = async (id) => {
  try {
    await apiClient.delete(`/bill/history/del/${id}`);
    billHistory.value = billHistory.value.filter(unit => unit.id !== id);
    alert('Unit history record deleted successfully!');
  } catch (error) {
    console.error('Error deleting unit history record:', error);
    alert('Failed to delete unit history record. Please try again.');
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

</style>
