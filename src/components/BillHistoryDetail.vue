<template>
  <div class="relative">
    <div class="items-start justify-between block sm:flex-row sm:items-center">
      <button @click="$router.push('/bill-history')" class="h-10 px-4 mt-5 mb-20 text-black transition duration-300 ease-in-out bg-white border-2 border-gray-500 hover:bg-gray-700 hover:text-white rounded-2xl w-28 focus:ring-gray-500 focus:ring-opacity-50">← Back</button>
      <h3 class="mb-4 text-2xl font-medium text-gray-700 sm:mb-0">Bill History Detail</h3>
    </div>
    <div class="mt-4 overflow-auto max-h-[700px] custom-scrollbar">
      <table class="w-full table-auto">
      <tbody>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap ">Room Number</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ roomNumber }}</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Previous Month's Units</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ previousNumberOfUnits }} kw</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Current Month's Units</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ currentNumberOfUnits }} kw</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Total Usage</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ totalUsage }} kw</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Water Cost</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ waterCost }} baht</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Rent Cost</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ rentCost }} baht</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Cost per Unit</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ costPerUnit }} baht/unit</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Resident Name</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ residentName }}</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Resident Email</td>
            <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ residentEmail }}</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 text-lg font-medium text-gray-900 bg-gray-300 border border-gray-300 whitespace-nowrap">Total Bills</td>
            <td class="px-6 py-2 text-lg text-gray-500 bg-gray-300 border border-gray-300 whitespace-nowrap">{{ totalBills }} baht</td>
          </tr>         
      </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient.js'; // Ensure you have an API client set up

const store = useStore();
const route = useRoute();

const roomNumber = ref('');
const previousNumberOfUnits = ref(0);
const currentNumberOfUnits = ref(0);
const residentName = ref('');
const residentEmail = ref('');
const totalBills = ref(0);
const waterCost = ref(0);
const rentCost = ref(0);
const costPerUnit = ref(0);

// const costPerUnit = computed(() => store.getters.getCostPerUnit);
// const waterCost = computed(() => store.getters.getWaterCost);
// const rentCost = computed(() => store.getters.getRentCost);
const totalUsage = computed(() => currentNumberOfUnits.value - previousNumberOfUnits.value);

const fetchData = async () => {
try {
  const response = await apiClient.get(`/bill/history/${route.params.id}`);
  const unitData = response.data.BillHistoryDetail;
  roomNumber.value = unitData.roomNumber || '';
  previousNumberOfUnits.value = unitData.previousNumberOfUnits || 0;
  currentNumberOfUnits.value = unitData.currentNumberOfUnits || 0;
  residentName.value = unitData.residentName || '';
  residentEmail.value = unitData.residentEmail || '';
  totalBills.value = unitData.amount || 0;
  waterCost.value = unitData.water_cost || 0;
  rentCost.value = unitData.rent_cost || 0;
  costPerUnit.value = unitData.cost_per_unit || 0;
} catch (error) {
  console.error('Error fetching unit data:', error);
}
};

fetchData();
</script>
