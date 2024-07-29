<template>
  <h2 class="mt-0 mb-2 text-xl font-bold">Update Unit</h2>
  <div class="max-w-sm min-w-full bg-gray-100 rounded-lg drop-shadow-md dark:border-gray-700">
    <div class="flex flex-col items-center">
      <h1 class="mt-4 text-xl font-bold underline">{{ roomNumber }}</h1>    </div>
    <div class="h-full mt-1">
      <div class="flex justify-around mb-4 space-x-4">
        <div class="flex flex-col items-center w-full p-4 text-center rounded-lg">
          <img src="https://via.placeholder.com/600" alt="Last month" style="width: 100px; height: 100px;" @click="openImageModal('https://via.placeholder.com/600')">
          <label for="lastMonth" class="block mt-2 text-sm font-medium text-gray-700">Last month</label>
          <div class="flex items-center mt-1">
            <input v-model="lastMonth" type="number" id="lastMonth" class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm w-28 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <span class="ml-2">kw</span>
          </div>
        </div>
        <div class="flex flex-col items-center w-full p-4 text-center rounded-lg">
          <img src="https://via.placeholder.com/600" alt="This month" style="width: 100px; height: 100px;" @click="openImageModal('https://via.placeholder.com/600')">
          <label for="thisMonth" class="block mt-2 text-sm font-medium text-gray-700">This month</label>
          <div class="flex items-center mt-1">
            <input v-model="thisMonth" type="number" id="thisMonth" class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm w-28 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <span class="ml-2">kw</span>
          </div>
        </div>
      </div>

      <hr class="my-2 gray-hr">
      <h2 class="px-6 py-2 mb-2 font-bold">Detail Units Table</h2>

      <div class="overflow-x-auto">
        <table class="h-full min-w-full divide-y divide-gray-200 ">
          <tbody class="divide-y divide-gray-200">
          <tr class="text-sm">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Real Usage</td>
            <td class="px-6 py-2 text-gray-500 whitespace-nowrap">{{ thisMonth }} - {{ lastMonth }} = {{ realUsage }} kw</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Unit Calculation</td>
            <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
              <input v-model="costPerUnit" type="number" class="w-32 px-2 py-1 mb-1 border border-gray-300 rounded-md" /> baht/unit
              <p>{{ realUsage }} * {{ costPerUnit }} = {{ unitCalculation }} baht</p>
            </td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Water cost</td>
            <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
              <input v-model="waterCost" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md" /> baht
            </td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Rent cost</td>
            <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
              <input v-model="rentCost" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md" /> baht
            </td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Total bill</td>
            <td class="px-6 py-2 font-bold text-gray-500 whitespace-nowrap">{{ totalBill }} baht</td>
          </tr>
          <tr class="text-sm">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Status</td>
            <td class="px-6 py-2 font-bold text-gray-500 whitespace-nowrap ">
              <select v-model="status" class="px-2 py-1 mb-4 border border-gray-300 rounded-md">
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
    <div class="fixed flex justify-end p-4 mt-2 mr-4 space-x-2 bottom-8 right-2">
      <button @click="submit" class="px-4 py-2 text-white rounded-md bg-emerald-600">Save</button>
      <button @click="cancel" class="px-4 py-2 text-white bg-gray-600 rounded-md">Cancel</button>
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
const status = ref(false); // default is disapprove
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
