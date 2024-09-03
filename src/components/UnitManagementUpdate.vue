<template>
  <h2 class="mt-0 mb-2 text-xl font-bold">Update Unit</h2>
  <div class="max-w-sm min-w-full bg-gray-100 rounded-lg drop-shadow-md dark:border-gray-700">
    <div class="flex flex-col items-center">
      <h1 class="mt-4 text-xl font-bold underline">{{ roomNumber }}</h1>
    </div>
    <div class="h-full mt-1">
      <div class="flex justify-around mb-4 space-x-4">
        <div class="flex flex-col items-center w-full p-4 text-center rounded-lg">
          <img src="https://via.placeholder.com/600" alt="Last month" style="width: 100px; height: 100px;" @click="openImageModal('https://via.placeholder.com/600')">
          <label for="prevNumberOfUnits" class="block mt-2 text-sm font-medium text-gray-700">Last month</label>
          <div class="flex items-center mt-1">
            <input v-model="prevNumberOfUnits" type="number" id="prevNumberOfUnits" class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm w-28 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <span class="ml-2">kw</span>
          </div>
        </div>
        <div class="flex flex-col items-center w-full p-4 text-center rounded-lg">
          <img src="https://via.placeholder.com/600" alt="This month" style="width: 100px; height: 100px;" @click="openImageModal('https://via.placeholder.com/600')">
          <label for="numberOfUnits" class="block mt-2 text-sm font-medium text-gray-700">This month</label>
          <div class="flex items-center mt-1">
            <input v-model="numberOfUnits" type="number" id="numberOfUnits" class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm w-28 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <span class="ml-2">kw</span>
          </div>
        </div>
      </div>

      <!-- Navigation Menu taps -->
      <div class="mx-6 mt-10 border-b-2 border-gray-300 mb- ml-b-2 mflex">
        <button
          @click="selectedTab = 'unitInfo'"
          :class="{'bg-primary text-white': selectedTab === 'unitInfo', 'bg-gray-200 text-gray-700': selectedTab !== 'unitInfo'}"
          class="px-4 py-2 text-sm font-medium focus:outline-none"
        >
          Units Information
        </button>
        <button
          @click="selectedTab = 'residentInfo'"
          :class="{'bg-primary text-white': selectedTab === 'residentInfo', 'bg-gray-200 text-gray-700': selectedTab !== 'residentInfo'}"
          class="px-4 py-2 text-sm font-medium focus:outline-none"
        >
          Resident Information
        </button>
      </div>

      <!-- Detail Units Information Section -->
      <div v-if="selectedTab === 'unitInfo'" class="px-6 py-2 ">
        <h2 class="mt-6 mb-6 font-bold">Detail Units Information</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <tbody class="divide-y divide-gray-200">
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Units Usage</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">{{ numberOfUnits }} - {{ prevNumberOfUnits }} = {{ totalUnit }} kw</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Unit Calculation</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
                <input v-model="costPerUnit" @change="updateCostPerUnit" type="number" class="w-32 px-2 py-1 mb-1 border border-gray-300 rounded-md" /> baht/unit
                <p>{{ totalUnit }} * {{ costPerUnit }} = {{ unitCalculation }} baht</p>
              </td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Water cost</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
                <input v-model="waterCostInput" @change="updateWaterCost" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md" /> baht
              </td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Rent cost</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
                <input v-model="rentCostInput" @change="updateRentCost" type="number" class="w-32 px-2 py-1 border border-gray-300 rounded-md" /> baht
              </td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Total bill</td>
              <td class="px-6 py-2 font-bold text-gray-500 whitespace-nowrap">{{ totalBill }} baht</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Status</td>
              <td class="px-6 py-2 font-bold text-gray-500 whitespace-nowrap ">
                <select v-model="approveStatus" class="px-2 py-1 mb-4 border border-gray-300 rounded-md">
                  <option value="approve">Approve</option>
                  <option value="disapprove">Disapprove</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Resident Information Section -->
      <div v-if="selectedTab === 'residentInfo'" class="px-6 py-2">
        <h2 class="mt-6 mb-6 font-bold ">Resident Information</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <tbody class="divide-y divide-gray-200">
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 font whitespace-nowrap ">Name:</td>       
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">{{ residentName }}</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Email:</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">{{ residentEmail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="fixed flex justify-end p-4 mt-2 mr-4 space-x-2 bottom-8 right-2">
    <button @click="submit" class="px-4 py-2 text-white rounded-md bg-primary">Save</button>
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
import { useStore } from 'vuex';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const route = useRoute();
const store = useStore();

const prevNumberOfUnits = ref('');
const numberOfUnits = ref('');
const initialPrevNumberOfUnits = ref(''); // To store the initial value
const initialNumberOfUnits = ref(''); // To store the initial value
const waterCostInput = ref(store.getters.getWaterCost);
const rentCostInput = ref(getRentCostForUnit(route.params.id));
const initialWaterCost = ref(store.getters.getWaterCost); // Store initial value
const initialRentCost = ref(getRentCostForUnit(route.params.id)); // Store initial value
const approveStatus = ref('disapprove'); // Default to 'disapprove'
const initialApproveStatus = ref('disapprove'); // Store initial value
const roomNumber = ref('');
const message = ref('');

const residentName = ref('');
const residentEmail = ref('');

const selectedTab = ref('unitInfo');

const costPerUnit = computed(() => store.getters.getCostPerUnit);

const totalUnit = computed(() => numberOfUnits.value - prevNumberOfUnits.value);
const unitCalculation = computed(() => totalUnit.value * costPerUnit.value);
const totalBill = computed(() => unitCalculation.value + waterCostInput.value + rentCostInput.value);

const fetchData = async () => {
  try {
    console.log('Fetching data for unit ID:', route.params.id);
    const response = await apiClient.get(`/unit/list/${route.params.id}`);
    console.log('API Response:', response.data);

    if (response.data && response.data.Unit) {
      prevNumberOfUnits.value = response.data.Unit.prevNumberOfUnits || prevNumberOfUnits.value;
      numberOfUnits.value = response.data.Unit.numberOfUnits || numberOfUnits.value;
      initialPrevNumberOfUnits.value = prevNumberOfUnits.value; // Store initial value
      initialNumberOfUnits.value = numberOfUnits.value; // Store initial value
      approveStatus.value = response.data.Unit.approveStatus ? 'approve' : 'disapprove';
      initialApproveStatus.value = approveStatus.value; // Store initial value
      roomNumber.value = response.data.Unit.res_room || roomNumber.value;

      await fetchResidentInfo(response.data.Unit.res_room);
    } else {
      console.warn('No unit data found in response:', response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchResidentInfo = async (roomNumber) => {
  try {
    const response = await apiClient.get(`/resident/list/room?query=${roomNumber}`);
    const resident = response.data.Resident[0];

    if (resident) {
      residentName.value = resident.name;
      residentEmail.value = resident.lineId;
    } else {
      console.warn('No resident data found for room number:', roomNumber);
    }
  } catch (error) {
    console.error("Error fetching resident information:", error);
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

    // Check if values have changed
    const hasChanges = (
      numberOfUnits.value !== initialNumberOfUnits.value ||
      prevNumberOfUnits.value !== initialPrevNumberOfUnits.value ||
      approveStatus.value !== initialApproveStatus.value ||
      waterCostInput.value !== initialWaterCost.value ||
      rentCostInput.value !== initialRentCost.value
    );

    if (!hasChanges) {
      console.debug('No changes detected');
      router.push('/unit-management');
      return;
    }

    const updatedUnitData = {
      numberOfUnits: numberOfUnits.value,
      prevNumberOfUnits: prevNumberOfUnits.value,
      approveStatus: approveStatus.value === 'approve',
      res_room: roomNumber.value,
    };

    console.debug('Updated unit data:', updatedUnitData);

    // Update unit data
    await apiClient.post(`/unit/add`, updatedUnitData);

    // Update frontend-only fields
    store.dispatch('updateWaterCost', waterCostInput.value);
    setRentCostForUnit(route.params.id, rentCostInput.value);

    alert('Unit updated successfully!');
    router.push('/unit-management');
  } catch (error) {
    console.error('Error during submission:', error);

    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      console.log("There's no record exists!")
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

const updateCostPerUnit = () => {
  store.dispatch('updateCostPerUnit', costPerUnit.value);
};

const updateWaterCost = () => {
  store.dispatch('updateWaterCost', waterCostInput.value);
};

const updateRentCost = () => {
  setRentCostForUnit(route.params.id, rentCostInput.value);
};

// Helper functions to manage rent cost locally
function getRentCostForUnit(unitId) {
  const rentCost = localStorage.getItem(`rentCost_${unitId}`);
  return rentCost ? parseFloat(rentCost) : 3500; // default rent cost
}

function setRentCostForUnit(unitId, rentCost) {
  localStorage.setItem(`rentCost_${unitId}`, rentCost);
}
</script>