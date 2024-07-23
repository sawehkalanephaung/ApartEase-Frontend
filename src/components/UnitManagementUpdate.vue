<template>
  <h2 class="mt-0 mb-2 text-xl font-bold">Update Unit</h2>
  <div class="max-w-sm rounded-lg drop-shadow-md bg-gray-100 dark:border-gray-700 min-w-full">
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-xl mt-4 underline">{{ roomNumber }}</h1>    </div>
    <div class="mt-1 h-full">
      <div class="flex justify-around mb-4 space-x-4">
        <div class="text-center items-center flex flex-col rounded-lg p-4 w-full">
          <img src="https://via.placeholder.com/600" alt="Last month" style="width: 100px; height: 100px;" @click="openImageModal('https://via.placeholder.com/600')">
          <label for="lastMonth" class="block text-sm font-medium text-gray-700 mt-2">Last month</label>
          <div class="flex items-center mt-1">
            <input v-model="lastMonth" type="number" id="lastMonth" class="block w-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <span class="ml-2">kw</span>
          </div>
        </div>
        <div class="text-center items-center flex flex-col rounded-lg p-4 w-full">
          <img src="https://via.placeholder.com/600" alt="This month" style="width: 100px; height: 100px;" @click="openImageModal('https://via.placeholder.com/600')">
          <label for="thisMonth" class="block text-sm font-medium text-gray-700 mt-2">This month</label>
          <div class="flex items-center mt-1">
            <input v-model="thisMonth" type="number" id="thisMonth" class="block w-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <span class="ml-2">kw</span>
          </div>
        </div>
      </div>

      <hr class="my-2 gray-hr">
      <h2 class="mb-2 px-6 py-2 font-bold">Detail Units Table</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full h-full divide-y divide-gray-200 ">
          <tbody class="divide-y divide-gray-200">
          <tr class="text-sm">
            <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-900">Real Usage</td>
            <td class="px-6 py-2 whitespace-nowrap text-gray-500">{{ thisMonth }} - {{ lastMonth }} = {{ realUsage }} kw</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-900">Unit Calculation</td>
            <td class="px-6 py-2 whitespace-nowrap text-gray-500">
              <input v-model="costPerUnit" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md mb-1" /> baht/unit
              <p>{{ realUsage }} * {{ costPerUnit }} = {{ unitCalculation }} baht</p>
            </td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-900">Water cost</td>
            <td class="px-6 py-2 whitespace-nowrap text-gray-500">
              <input v-model="waterCost" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md" /> baht
            </td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-900">Rent cost</td>
            <td class="px-6 py-2 whitespace-nowrap text-gray-500">
              <input v-model="rentCost" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md" /> baht
            </td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-900">Total bill</td>
            <td class=" font-bold px-6 py-2 whitespace-nowrap text-gray-500">{{ totalBill }} baht</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-900">Status</td>
            <td class="font-bold px-6 py-2 whitespace-nowrap text-gray-500 ">
              <select v-model="status" class="border border-gray-300 rounded-md px-2 py-1 mb-4">
                <option value="approve">Approve</option>
                <option value="disapprove">Disapprove</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
    <div class="fixed bottom-8 right-2 flex justify-end mt-2 space-x-2 p-4 mr-4">
      <button @click="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-md">Save</button>
      <button @click="cancel" class="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
    </div>
  <!-- Image Modal -->
  <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeImageModal">
    <div class="relative bg-white rounded-lg shadow-lg max-w-full max-h-full p-4" @click.stop>
      <button @click="closeImageModal" class="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="mt-8">
        <img :src="currentImage || 'https://via.placeholder.com/700'" alt="Unit Image" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const route = useRoute();

const lastMonth = ref('');
const thisMonth = ref('');
const costPerUnit = ref(3);
const waterCost = ref(100);
const rentCost = ref(3500);
const status = ref(true); // default is approve
const roomNumber = ref('');
const message = ref('');

const realUsage = computed(() => thisMonth.value - lastMonth.value);
const unitCalculation = computed(() => realUsage.value * costPerUnit.value);
const totalBill = computed(() => unitCalculation.value + waterCost.value + rentCost.value);

const fetchData = async () => {
  try {
    // Log the update unit ID
    console.log('Fetching data for unit ID:', route.params.id);
    const response = await apiClient.get(`/unit/list/${route.params.id}`);
    // API Response:
    console.log('API Response:', response.data);

    if (response.data && response.data.Unit) {
      lastMonth.value = response.data.Unit.numberOfUnits || lastMonth.value;
      thisMonth.value = response.data.Unit.extractionStatus || thisMonth.value;
      costPerUnit.value = response.data.Unit.costPerUnit || costPerUnit.value;
      waterCost.value = response.data.Unit.waterCost || waterCost.value;
      rentCost.value = response.data.Unit.rentCost || rentCost.value;
      status.value = response.data.Unit.approveStatus || status.value; // Corrected status fetching
      roomNumber.value = response.data.Unit.res_room || roomNumber.value;
    } else {
      console.warn('No unit data found in response:', response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const cancel = () => {
  router.push('/unit-management');
};
const submit = async () => {
  try {
    console.debug('Submit function called');
    const updatedData = {
      numberOfUnits: lastMonth.value,
      extractionStatus: thisMonth.value,
      costPerUnit: costPerUnit.value,
      waterCost: waterCost.value,
      rentCost: rentCost.value,
      approveStatus: status.value,
      res_room: roomNumber.value,
      date: new Date().toISOString().split('T')[0] // Add the date field
    };

    console.debug('Updated data:', updatedData);

    const response = await apiClient.put(`/unit/edit/${route.params.id}`, updatedData);
    const result = response.data;
    alert(result.message);
    router.push('/unit-management');
    if (result.status === 'ok') {
      router.push('/unit-management');
    }
  } catch (error) {
    console.log("The room that record refer does not exists!")
    console.error('Error during submission:', error);

    if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the server
      message.value = error.response.data.message;
    } else {
      console.log("There's no record exists!")
      // Display the error message from the server

    }
  }
};


const showImageModal = ref(false);
const currentImage = ref('');

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  currentImage.value = '';
};
</script>
