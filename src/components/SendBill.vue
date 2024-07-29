<template>
  <div class="relative">
    <h3 class="text-2xl font-medium text-gray-700">Send Bill</h3>
    <button @click="sendBills" class="absolute top-0 right-0 px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700">Send Bills</button>
    <div class="mt-4 overflow-auto max-h-[500px]"> <!-- Add overflow-auto and max-height -->
      <table class="min-w-full leading-normal text-md">
        <thead>
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
            <td colspan="5" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">No Bill Data</td>
          </tr>
          <tr v-else v-for="unit in unitList" :key="unit.id">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <input type="checkbox" v-model="unit.selected" :value="unit.id" class="lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-4 sm:h-4" role="checkbox" :aria-checked="unit.selected" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.roomNumber }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.unitsUsed }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.totalBill }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <button @click="editUnit(unit.id)" class="text-emerald-600 hover:text-emerald-900">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Display total units and selected units below the table -->
    <div class="mt-4 text-right">
      <span class="font-semibold text-md">Total Units: {{ totalUnits }}</span>
      <span class="ml-4 font-semibold text-md">Selected Units: {{ selectedUnitsCount }}</span>
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

onMounted(() => {
  const storedUnits = localStorage.getItem('selectedUnits');
  if (storedUnits) {
    unitList.value = JSON.parse(storedUnits).map(unit => ({...unit, selected: false}));
  }
});

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
    await apiClient.post('/send-bills', { units: selectedUnits });
    alert('Bills sent successfully!');
    localStorage.removeItem('selectedUnits'); // Clear local storage after sending bills
    unitList.value = []; // Clear the unit list
  } catch (error) {
    console.error('Error sending bills:', error);
    alert('Failed to send bills. Please try again.');
  }
};

// Computed properties to calculate total units and selected units
const totalUnits = computed(() => {
  return unitList.value.length;
});

const selectedUnitsCount = computed(() => {
  return unitList.value.filter(unit => unit.selected).length;
});
</script>

<style scoped>
/* Add styles to ensure the table stays within the container */
.overflow-auto {
  overflow: auto;
}

.max-h-[500px] {
  max-height: 500px;
}
</style>
