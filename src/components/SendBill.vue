<template>
  <div class="relative">
    <h3 class="text-2xl font-medium text-gray-700">Send Bill</h3>
    <button @click="sendBills" class="absolute top-0 right-0 px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700">Send Bills</button>
    <div class="mt-4 overflow-auto max-h-[700px] custom-scrollbar">
      <table class="min-w-full leading-normal text-md">
        <thead class="sticky-header">
          <tr>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              <input type="checkbox" @change="toggleSelectAll" v-model="selectAll" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" />
            </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Room No</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Units Used</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Total Bill</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="validUnits.length === 0">
            <td colspan="6" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">No Bill Data</td>
          </tr>
          <tr v-else v-for="unit in validUnits" :key="unit.id">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="unit.selected" :value="unit.id" class="lg:w-4 lg:h-4 md:w-4 sm:w-4 sm:h-4" role="checkbox" :aria-checked="unit.selected" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.res_room }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.totalUnit }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.totalBill }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <button @click="editUnit(unit.id)" class="text-emerald-600 hover:text-emerald-900">Edit</button>
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
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 010-1.414l4-4a1 1 011.414 0z" clip-rule="evenodd" />
              </svg>
            </a>
            <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" :class="{ 'bg-emerald-600 text-white': page === currentPage }">{{ page }}</span>
            <a @click="nextPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 cursor-pointer rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient.js';
import { usePagination } from '@/composables/usePagination';

const router = useRouter();
const route = useRoute();
const unitList = ref([]);
const selectAll = ref(false);

const fetchData = async () => {
  try {
    console.log('Fetching bill data...');
    const response = await apiClient.get('/bill/list', {
      params: {
        page: currentPage.value,
        per_page: 5, // Add this line to set items per page
      },
    });

    const bills = response.data.Bills || [];
    const residents = response.data.Resident || [];

    const residentEmailMap = residents.reduce((map, resident) => {
      map[resident.roomNumber] = resident.lineId;
      return map;
    }, {});

    unitList.value = bills.map(bill => ({
      ...bill,
      selected: false,
      lineId: residentEmailMap[bill.res_room] || ''
    }));

    // Update pagination data
    const paginationData = response.data.pagination || response.data.meta || {};
    totalPages.value = paginationData.total_pages || 1;
    currentPage.value = paginationData.page || 1;
    totalItems.value = paginationData.total_bills || bills.length;

    console.log('Bill data fetched successfully', unitList.value);
  } catch (error) {
    console.error('Error fetching bills:', error);
    alert('Failed to fetch bills. Please check your network connection and try again.');
  }
};

const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);

onMounted(async () => {
  await fetchData();
});

watch(currentPage, fetchData);

const toggleSelectAll = () => {
  unitList.value.forEach(unit => unit.selected = selectAll.value);
};

const editUnit = (id) => {
  router.push({ name: 'UnitHistoryUpdate', params: { id } });
};

const sendBills = async () => {
  const selectedUnits = unitList.value.filter(unit => unit.selected);
  if (selectedUnits.length === 0) {
    alert('Please select at least one unit to send bills.');
    return;
  }

  try {
    if (selectedUnits.length === unitList.value.length) {
      console.log('Sending all bills...');
      await apiClient.post('/bill/send_all');
    } else {
      for (const unit of selectedUnits) {
        console.log(`Sending bill for unit ID: ${unit.id}`);
        await apiClient.post(`/bill/send/${unit.id}`, {
          costPerUnit: unit.costPerUnit,
          waterCost: unit.waterCost,
          rentCost: unit.rentCost
        });
        console.log(`Deleting bill for unit ID: ${unit.id}`);
        await apiClient.delete(`/bill/del/${unit.id}`);
      }
    }
    alert('Bills sent and deleted successfully!');
    await fetchData(); // Refresh the data after sending bills
    console.log('Bills sent, deleted, and UI updated successfully');
  } catch (error) {
    console.error('Error sending or deleting bills:', error);
    alert('Failed to send or delete bills. Please try again.');
  }
};

const totalBills = computed(() => {
  return unitList.value.length;
});

const selectedBillsCount = computed(() => {
  return unitList.value.filter(unit => unit.selected).length;
});

// Computed property to filter valid units
const validUnits = computed(() => {
  return unitList.value.filter(unit => unit.id && unit.res_room && unit.totalUnit && unit.totalBill);
});
</script>


<style scoped>
.overflow-auto {
  overflow: auto;
}

.max-h-[700px] {
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
