<template>
  <div class="relative">
    <h3 class="text-2xl font-medium text-gray-700">Bill</h3>
    <button @click="sendBills" class="absolute top-0 right-0 px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700">Bills</button>
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
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Room No</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Total Bill</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Date Created</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="validUnits.length === 0">
            <td colspan="6" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">No data found!</td>
          </tr>
          <tr v-else v-for="unit in validUnits" :key="unit.id"
    class="transition-all duration-200 cursor-pointer"
    :class="[
      unit.selected ? 'bg-emerald-100 hover:bg-emerald-200!important border-l-4 border-emerald-500' : 'hover:bg-gray-100'
    ]">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="unit.selected" :value="unit.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" role="checkbox" :aria-checked="unit.selected" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <img :src="unit.unitImage || 'https://via.placeholder.com/600'" alt="Unit Image" class="object-cover cursor-pointer w-14 h-14" @click="openImageModal(unit.unitImage)" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.res_room }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.amount }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.date_created }}</td>
           
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <button @click="editUnit(unit.unit_id)" class="text-emerald-600 hover:text-emerald-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
              </svg>
              </button>
              <button @click="onDelete(unit.id)" class="ml-2 text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 text-right">
      <span class="font-semibold text-md">Total No Bills: {{ validUnits.length }}</span>
      <span class="ml-4 font-semibold text-md">Selected bills: {{ selectedBillsCount }}</span>
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
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue'; // Import the modal component

const router = useRouter();
const route = useRoute();
const store = useStore(); // Initialize Vuex store
const unitList = ref([]);
const selectAll = ref(false);
const showDeleteConfirm = ref(false); // State for showing delete confirmation modal
const unitToDelete = ref(null); // State for the unit to be deleted
const showImageModal = ref(false); // State for showing image modal
const currentImage = ref(''); // State for the current image URL

const fetchData = async () => {
  try {
    console.log('Fetching bill data...');
    const [billResponse, residentResponse] = await Promise.all([
      apiClient.get('/bill/list'),
      apiClient.get('/resident/list')
    ]);

    const bills = billResponse.data.Bills;
    const residents = residentResponse.data.Resident;

    const residentEmailMap = residents.reduce((map, resident) => {
      map[resident.roomNumber] = resident.lineId;
      return map;
    }, {});

    unitList.value = bills
      .filter(bill => bill.id && bill.res_room && bill.date_created && bill.amount) // Filter out invalid bills
      .map(bill => ({
        ...bill,
        selected: false,
        res_room: bill.res_room, // Use res_room for room number
        lineId: residentEmailMap[bill.res_room] || '',
        unitImage: bill.unitImage || 'https://via.placeholder.com/600' // Add unitImage property
      }));
    console.log('Bill data fetched successfully');

  } catch (error) {
    console.error('Error fetching bills:', error);
  }
};

onMounted(async () => {
  const storedUnits = route.query.selectedUnits ? JSON.parse(route.query.selectedUnits) : [];
  unitList.value = storedUnits.map(unit => ({...unit, selected: false}));

  await fetchData();
});

const toggleSelectAll = () => {
  unitList.value.forEach(unit => unit.selected = selectAll.value);
};

const editUnit = (unitId) => {
  router.push({ name: 'UnitManagementUpdate', params: { id: unitId } });
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
      await apiClient.delete('/bill/del_all');
    } else {
      for (const unit of selectedUnits) {
        console.log(`Sending bill for unit ID: ${unit.id}`);
        
        try {
          const response = await apiClient.post(`/bill/send/${unit.id}`);

          const billId = response.data.bill_id; // Ensure the response contains the bill_id
          if (!billId) {
            throw new Error('Bill ID is missing in the response');
          }

          // Prepare the payload for bill history
          const billHistoryPayload = {
            unit_id: unit.id,
            amount: unit.amount,
            date_sent: new Date().toISOString()
          };

          // Validate the payload
          if (!billHistoryPayload.amount || !billHistoryPayload.date_sent) {
            throw new Error('Invalid payload for bill history');
          }

          // Add the bill record to bill history
          console.log(`Adding bill history for bill ID: ${billId}`);
          await apiClient.post('/bill/history/add', billHistoryPayload);

          // Delete the bill record
          console.log(`Deleting bill for unit ID: ${unit.id}`);
          await apiClient.delete(`/bill/del/${unit.id}`);
        } catch (error) {
          console.error(`Error processing bill for unit ID ${unit.id}:`, error);
          continue; // Skip to the next unit
        }
      }
    }
    alert('Bills sent successfully!');
    localStorage.removeItem('selectedUnits');
    unitList.value = unitList.value.filter(unit => !unit.selected);
    console.log('Bills sent successfully');
  } catch (error) {
    console.error('Error sending bills:', error);
    alert('Failed to send bills. Please try again.');
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
  return unitList.value.filter(unit => unit.id && unit.res_room && unit.date_created && unit.amount);
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
  } catch (error) {
    console.error('Error deleting bill:', error);
    alert('Failed to delete bill. Please try again.');
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
