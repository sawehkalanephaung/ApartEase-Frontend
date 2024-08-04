<template>
  <div class="relative">
    <h3 class="text-2xl font-medium text-gray-700">Send Bill</h3>
    <button @click="sendBills" class="absolute top-0 right-0 px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700">Send Bills</button>
    <button @click="deleteSelectedBills" class="absolute top-0 px-4 py-2 text-white bg-red-600 rounded-md right-28 hover:bg-red-700">Delete</button>    
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
            <!-- <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Email</th> -->
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
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.roomNumber }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.unitsUsed }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.totalBill }}</td>
            <!-- <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ unit.lineId }}</td> -->
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <button @click="editUnit(unit.id)" class="text-emerald-600 hover:text-emerald-900">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Display total units and selected units below the table -->
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
  const storedUnits = localStorage.getItem('selectedUnits');
  if (storedUnits) {
    unitList.value = JSON.parse(storedUnits).map(unit => ({...unit, selected: false}));
  }

  await fetchData();
});
const fetchData = async () => {
  try {
    const response = await apiClient.get('/resident/list');
    const residents = response.data.Resident;

    // Fetch additional data for each unit
    for (const unit of unitList.value) {
      const unitResponse = await apiClient.get(`/unit/list/${unit.id}`);
      const unitData = unitResponse.data.Unit;
      console.log('API Response for Unit:', unitData); // Log the entire response

      // Convert string values to numbers and provide default values if necessary
      const extractionStatus = Number(unitData.extractionStatus) || 0;
      const numberOfUnits = Number(unitData.numberOfUnits) || 0;
      const costPerUnit = Number(unitData.costPerUnit) || 3; // Default value 3
      const waterCost = Number(unitData.waterCost) || 100; // Default value 100
      const rentCost = Number(unitData.rentCost) || 3500; // Default value 4000

      // Log the values being used for calculation
      console.log(`Extraction Status: ${extractionStatus}, Number of Units: ${numberOfUnits}, Cost Per Unit: ${costPerUnit}, Water Cost: ${waterCost}, Rent Cost: ${rentCost}`);

      // Calculate totalBill based on the fetched data
      unit.unitsUsed = extractionStatus - numberOfUnits;
      unit.totalBill = unit.unitsUsed * costPerUnit + waterCost + rentCost;
      
      console.log(`Unit ID: ${unit.id}, Units Used: ${unit.unitsUsed}, Total Bill: ${unit.totalBill}`); // debugging line
    }

    unitList.value = unitList.value.map(unit => {
      const resident = residents.find(res => res.roomNumber === unit.roomNumber);
      return {
        ...unit,
        // change to resident email address 
        lineId: resident ? resident.lineId : 'N/A',
      };
    });
  } catch (error) {
    console.error('Error fetching resident email address or total bill:', error);
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
    await apiClient.post('/send-bills', { units: selectedUnits });
    alert('Bills sent successfully!');
    localStorage.removeItem('selectedUnits'); // Clear local storage after sending bills
    unitList.value = unitList.value.filter(unit => !unit.selected); // Clear only selected units from the list
  } catch (error) {
    console.error('Error sending bills:', error);
    alert('Failed to send bills. Please try again.');
  }
};

// Computed properties to calculate total units and selected units
const totalBills = computed(() => {
  return unitList.value.length;
});

const selectedBillsCount = computed(() => {
  return unitList.value.filter(unit => unit.selected).length;
});

const deleteSelectedBills = () => {
  if (selectedBillsCount.value === 0) {
    alert('Please select at least one bill to delete.');
    return;
  }
  
  if (confirm(`Are you sure you want to delete ${selectedBillsCount.value} selected bill(s)?`)) {
    unitList.value = unitList.value.filter(unit => !unit.selected);
    localStorage.setItem('selectedUnits', JSON.stringify(unitList.value));
    selectAll.value = false;
    alert('Selected bills deleted successfully!');
  }
};

</script>

<style scoped>
/* Add styles to ensure the table stays within the container */
.overflow-auto {
  overflow: auto;
}

.max-h-[600px] {
  max-height: 600px;
}

/* Add styles for sticky header */
.sticky-header {
  position: sticky;
  top: 0;
  background-color: white; /* Ensure the background color matches the table header */
  z-index: 1; /* Ensure it stays above the table rows */
}

/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
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

/* For Firefox */
.custom-scrollbar {
  scrollbar-width: thin; 
  scrollbar-color: gray #f1f1f1; 
}
</style>
