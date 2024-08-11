<template>
  <div class="relative">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-medium text-gray-700">Unit History</h3>
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
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Unit Image</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Room No</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Units Uints Used</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Total Bill</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Status</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="unitHistory.length === 0">
            <td colspan="6" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">No Unit History Data</td>
          </tr>
          <tr v-else v-for="record in filteredUnitHistory" :key="record.id">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <img :src="record.unitImage" alt="Unit Image" class="object-cover w-14 h-14" />
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ record.res_room }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ record.totalUnit }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ record.totalBill }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                {{ record.status }}
              </span>
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ record.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import apiClient from '@/services/AxiosClient.js';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const unitHistory = ref([]);
const startDate = ref(null);
const endDate = ref(null);

const fetchData = async () => {
  try {
    const response = await apiClient.get('/unit/history/list');
    unitHistory.value = response.data.UnitHistory.map(unit => ({
      ...unit,
      unitImage: unit.unitImage || 'https://via.placeholder.com/600',
      totalUnit: Number(unit.extractionStatus) - Number(unit.numberOfUnits), 
      totalBill: (Number(unit.extractionStatus) - Number(unit.numberOfUnits)) * Number(unit.costPerUnit) + Number(unit.waterCost) + Number(unit.rentCost)
    }));
  } catch (error) {
    console.error('Error fetching unit history:', error);
  }
};

const handleStartDateChange = (date) => {
  startDate.value = date;
  fetchData();
};

const handleEndDateChange = (date) => {
  endDate.value = date;
  fetchData();
};

const filteredUnitHistory = computed(() => {
  let filtered = unitHistory.value;

  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    filtered = filtered.filter(unit => {
      const unitDate = new Date(unit.date);
      return unitDate >= start && unitDate <= end;
    });
  }

  return filtered;
});

onMounted(() => {
  fetchData();
});
</script>

