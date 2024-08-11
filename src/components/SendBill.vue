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
          <tr v-if="unitList.length === 0">
            <td colspan="6" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">No Bill Data</td>
          </tr>
          <tr v-else v-for="unit in unitList" :key="unit.id">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="unit.selected" :value="unit.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" role="checkbox" :aria-checked="unit.selected" />
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
    <div class="mt-4 text-right">
      <span class="font-semibold text-md">Total bills: {{ totalBills }}</span>
      <span class="ml-4 font-semibold text-md">Selected bills: {{ selectedBillsCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const route = useRoute();
const unitList = ref([]);
const selectAll = ref(false);

onMounted(async () => {
  const storedUnits = route.query.selectedUnits ? JSON.parse(route.query.selectedUnits) : [];
  unitList.value = storedUnits.map(unit => ({...unit, selected: false}));

  await fetchData();
});

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

    unitList.value = bills.map(bill => ({
      ...bill,
      selected: false,
      lineId: residentEmailMap[bill.res_room] || ''
    }));

    console.log('Bill data fetched successfully');
  } catch (error) {
    console.error('Error fetching bills:', error);
  }
};

const toggleSelectAll = () => {
  unitList.value.forEach(unit => unit.selected = selectAll.value);
};

const editUnit = (id) => {
  router.push({ name: 'UnitManagementUpdate', params: { id } });
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
        await apiClient.post(`/bill/send/${unit.id}`);
        console.log(`Deleting bill for unit ID: ${unit.id}`);
        await apiClient.delete(`/bill/del/${unit.id}`);
      }
    }
    alert('Bills sent and deleted successfully!');
    localStorage.removeItem('selectedUnits');
    unitList.value = unitList.value.filter(unit => !unit.selected);
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
</script>

<style scoped>
.overflow-auto {
  overflow: auto;
}

.max-h-[600px] {
  max-height: 600px;
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
