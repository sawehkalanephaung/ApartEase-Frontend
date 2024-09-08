<template>
    <div class="relative">
      <div class="items-start justify-between block sm:flex-row sm:items-center">
        <button @click="$router.push('/bill-history')" class="h-10 mt-5 mb-20 text-white rounded-md hover:emerald-blue-600 w-28 bg-primary">← Back</button>
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
              <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ lastMonth }} kw</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Current Month's Units</td>
              <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ thisMonth }} kw</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Total Usage</td>
              <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ totalUnit }} kw</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Water Cost</td>
              <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ waterCostInput }} baht</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 text-base font-medium text-gray-900 border border-gray-300 whitespace-nowrap">Rent Cost</td>
              <td class="px-6 py-2 text-gray-500 border border-gray-300 whitespace-nowrap">{{ rentCostInput }} baht</td>
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
              <td class="px-6 py-2 text-lg text-gray-500 bg-gray-300 border border-gray-300 whitespace-nowrap">{{ totalBills }}</td>
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

const store = useStore();
const route = useRoute();

const roomNumber = ref('');
const lastMonth = ref(0);
const thisMonth = ref(0);
const waterCostInput = ref(0);
const rentCostInput = ref(0);
const residentName = ref('');
const residentEmail = ref('');

const costPerUnit = computed(() => store.getters.getCostPerUnit);
const totalUnit = computed(() => thisMonth.value - lastMonth.value);

const fetchData = async () => {
  try {
    const response = await apiClient.get(`/unit/history/detail/${route.params.id}`);
    const unitData = response.data.BillHistoryDetail;
    roomNumber.value = unitData.res_room || '';
    lastMonth.value = unitData.numberOfUnits || 0;
    thisMonth.value = unitData.extractionStatus || 0;
    waterCostInput.value = unitData.waterCost || 0;
    rentCostInput.value = unitData.rentCost || 0;
    residentName.value = unitData.residentName || '';
    residentEmail.value = unitData.residentEmail || '';
  } catch (error) {
    console.error('Error fetching unit data:', error);
  }
};



fetchData();
</script>
