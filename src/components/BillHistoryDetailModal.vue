<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">Bill History Detail</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 mb-6 bg-gray-100 rounded-lg">
          <h3 class="mb-3 text-lg font-semibold text-gray-700">Bill Informations</h3>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-gray-600">Resident Name:</div>
            <div class="font-medium text-right">{{ residentName }}</div>
            <div class="text-gray-600">Resident Email:</div>
            <div class="font-medium text-right break-words">{{ residentEmail }}</div>
            <div class="text-gray-600">Room Number:</div>
            <div class="font-medium text-right">{{ roomNumber }}</div>
            <div class="text-gray-600">Previous Month's Units:</div>
            <div class="font-medium text-right">{{ previousNumberOfUnits }} kw</div>
            <div class="text-gray-600">Current Month's Units:</div>
            <div class="font-medium text-right">{{ currentNumberOfUnits }} kw</div>
            <div class="text-gray-600">Total Usage:</div>
            <div class="font-medium text-right">{{ totalUsage }} kw</div>
            <div class="text-gray-600">Date Sent:</div>
            <div class="font-medium text-right">{{ formattedDate }}</div>
          </div>
        </div>
        
        <div>
          <h3 class="mb-3 text-lg font-semibold text-gray-700">Expense Breakdown</h3>
          <div class="space-y-2">
            <div class="flex justify-between pb-2 border-b">
              <span class="text-gray-600">Water Cost:</span>
              <span class="font-medium">{{ waterCost }} baht</span>
            </div>
            <div class="flex justify-between pb-2 border-b">
              <span class="text-gray-600">Rent Cost:</span>
              <span class="font-medium">{{ rentCost }} baht</span>
            </div>
            <div class="flex justify-between pb-2 border-b">
              <span class="text-gray-600">Cost per Unit:</span>
              <span class="font-medium">{{ costPerUnit }} baht/unit</span>
            </div>
            <div class="flex justify-between pb-2 border-b">
              <span class="text-gray-600">Electricity Cost:</span>
              <span class="font-medium">{{ electricityCost }} baht</span>
            </div>
            <div class="flex items-center justify-between p-2 mt-4 rounded-lg">
              <span class="font-semibold text-gray-800">Total Bill:</span>
              <span class="text-xl font-bold text-emerald-600">{{ totalBills }} baht</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import apiClient from '@/services/AxiosClient.js';
  
  const props = defineProps({
    show: Boolean,
    billId: String,
  });
  
  const emit = defineEmits(['close']);
  
  const roomNumber = ref('');
  const previousNumberOfUnits = ref(0);
  const currentNumberOfUnits = ref(0);
  const residentName = ref('');
  const residentEmail = ref('');
  const totalBills = ref(0);
  const waterCost = ref(0);
  const rentCost = ref(0);
  const costPerUnit = ref(0);
  const totalUsage = computed(() => currentNumberOfUnits.value - previousNumberOfUnits.value);
  const electricityCost = computed(() => totalUsage.value * costPerUnit.value);
  const dateSent = ref('');

  
  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/bill/history/${props.billId}`);
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
      dateSent.value = unitData.date_sent || '';
    } catch (error) {
      console.error('Error fetching unit data:', error);
    }
  };
  
  watch(() => props.show, (newVal) => {
    if (newVal) {
      fetchData();
    }
  });
  
  const closeModal = () => {
    emit('close');
  };

  const formattedDate = computed(() => {
  const dateObj = new Date(dateSent.value);
  return dateObj.toLocaleDateString();
});

  </script>
  
  <style scoped>
  /* Your scoped styles here */
  </style>
  