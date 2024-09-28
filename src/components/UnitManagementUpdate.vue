<template>

   <div class="p-[20px] h-full overflow-visible">
    <div class="flex flex-col h-full">
  <div class="flex items-center mb-2">
    <h3 class="mt-0 text-xl font-bold">Update Unit</h3>
    <h1 class="mx-auto text-xl font-bold underline">{{ roomNumber }}</h1>
  </div>
  <div class="max-w-sm min-w-full sm:px-4">
    <div class="flex-grow overflow-auto">
      <div class="flex flex-col justify-around mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div class="flex flex-col items-center w-full p-4 text-center rounded-2xl">
          <img :src="prevImgUrl" alt="Last month" style="width: 100px; height: 100px;" @click="openImageModal(prevImgUrl)">
          <label for="prevNumberOfUnits" class="block mt-2 text-sm font-medium text-gray-700">Last month</label>
          <div class="flex items-center mt-1">
            <input v-model="prevNumberOfUnits" type="number" id="prevNumberOfUnits" class="relative z-10 w-32 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            />
            <span class="ml-2">kw</span>
          </div>
        </div>
        <div class="flex flex-col items-center w-full p-4 text-center rounded-2xl">
          <img :src="imgUrl" alt="This month" style="width: 100px; height: 100px;" @click="openImageModal(imgUrl)">
          <label for="numberOfUnits" class="block mt-2 text-sm font-medium text-gray-700">This month</label>
          <div class="flex items-center mt-1">
            <input v-model="numberOfUnits" type="number" id="numberOfUnits" class="relative z-10 w-32 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            />
            <span class="ml-2">kw</span>
          </div>
        </div>
      </div>
     

      <!-- Navigation Menu taps -->
      <div class="flex flex-wrap mx-2 mt-4 border-b-2 border-gray-300 sm:mx-6 sm:mt-6">
        <button
          @click="selectedTab = 'unitInfo'"
          :class="{'bg-primary text-white': selectedTab === 'unitInfo', 'bg-gray-200 text-gray-700': selectedTab !== 'unitInfo'}"
          class="px-4 py-2 text-sm font-medium focus:outline-none "
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
      <div v-if="selectedTab === 'unitInfo'" class="px-2 py-2 overflow-x-auto sm:px-6">
        <table class="w-full divide-y divide-gray-200 table-auto">
          <tbody class="divide-y divide-gray-200">
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Units Usage</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">{{ numberOfUnits }} - {{ prevNumberOfUnits }} = {{ totalUnit }} kw</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Unit Calculation</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
                <input v-model="costPerUnit" @change="updateCostPerUnit" type="number" class="w-32 px-3 py-2 mb-1 border border-gray-300 cursor-not-allowed rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600" disabled> baht/unit
                <p>{{ totalUnit }} * {{ costPerUnit }} = {{ unitCalculation }} baht</p>
              </td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Water cost</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
                <input v-model="waterCostInput" @change="updateWaterCost" type="number" class="relative z-10 w-32 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
                /> baht
              </td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Rent cost</td>
              <td class="px-6 py-2 text-gray-500 whitespace-nowrap">
                <input v-model="rentCostInput" @change="updateRentCost" type="number" class="relative z-10 w-32 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"/> baht
              </td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Total bill</td>
              <td class="px-6 py-2 font-bold text-gray-500 whitespace-nowrap">{{ totalBill }} baht</td>
            </tr>
            <tr class="text-sm">
              <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">Status</td>
              <td class="px-6 py-2 font-bold text-gray-500 whitespace-nowrap ">
                <select v-model="approveStatus" class="relative z-10 w-32 px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
                >
                  <option value="approve">Approve</option>
                  <option value="disapprove">Disapprove</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Resident Information Section -->
      <div v-if="selectedTab === 'residentInfo'" class="px-2 py-2 overflow-x-auto sm:px-6">
        <table class="w-full divide-y divide-gray-200">
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
  <div class="flex justify-end space-x-2">
    <button @click="cancel" class="relative z-30 px-3 py-2 font-bold bg-white border-2 rounded-2xl text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white w-28">Cancel</button>
    <button @click="submit" class="relative z-30 px-4 py-2 text-white rounded-2xl bg-emerald-600 hover:bg-emerald-500 w-28">Save</button>


      </div>
 <!-- Image Modal -->
<div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeImageModal">
  <div class="relative w-full max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg" @click.stop>
    <button @click="closeImageModal" class="absolute text-gray-700 top-2 right-2 hover:text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="flex items-center justify-center h-full">
      <img :src="currentImage || 'https://via.placeholder.com/600'" alt="Unit Image" class="object-contain max-w-full max-h-[80vh]" />
    </div>
  </div>
</div>

  </div>
</div>
<ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import apiClient from '@/services/AxiosClient.js';
import ToastNotification from '@/components/ToastNotification.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const prevNumberOfUnits = ref('');
const prevImgUrl = ref('');
const numberOfUnits = ref('');
const initialPrevNumberOfUnits = ref(''); // To store the initial value
const initialNumberOfUnits = ref(''); // To store the initial value
const waterCostInput = ref(store.getters.getWaterCost);
const rentCostInput = ref(store.getters.getRentCost);
const initialWaterCost = ref(store.getters.getWaterCost); // Store initial value
const initialRentCost = ref(store.getters.getRentCost); // Store initial value
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

const imgUrl = ref('');

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};


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
      imgUrl.value = response.data.Unit.imgUrl || imgUrl.value;
      prevImgUrl.value = response.data.Unit.prevImgUrl || prevImgUrl.value;

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
      extractionStatus: approveStatus.value === 'approve' ? 'Fully successful' : 'Not fully successful',
      imgUrl: imgUrl.value, // Include the imgUrl here
    };



    console.debug('Updated unit data:', updatedUnitData);

    // Update unit data
    await apiClient.put(`/unit/edit/${route.params.id}`, updatedUnitData);

    // Update frontend-only fields
    store.dispatch('updateWaterCost', waterCostInput.value);
    store.dispatch('updateRentCost', rentCostInput.value);

    // Show success message
    showToastMessage('Unit updated successfully', 'success');

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
  store.dispatch('updateRentCost', rentCostInput.value);
};

</script>


<style scoped>
@media screen and (max-width: 390px) {
  .max-w-sm {
    padding: 0.5rem;
  }

  table {
    font-size: 0.875rem;
  }

  td {
    padding: 0.5rem 0.25rem;
  }

  input[type="number"],
  select {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .absolute {
    position: static;
    margin-top: 1rem;
  }

  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

@media screen and (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }

  td {
    padding: 0.5rem 0.25rem;
  }

  input[type="number"],
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

/* New media queries for specific screen sizes */
@media screen and (min-width: 740px) and (max-width: 1097px) {
  .flex-grow {
    overflow: visible;
  }

  table {
    table-layout: fixed;
  }

  td {
    position: relative;
  }

  input[type="number"],
  select {
    position: relative;
    z-index: 10;
  }
}

/* Ensure interactivity for larger screens */
@media screen and (min-width: 1098px) {
  .flex-grow {
    overflow: visible;
  }
}



</style>