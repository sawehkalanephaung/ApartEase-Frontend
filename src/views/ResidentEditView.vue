<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Edit Resident</h3>

      <form @submit.prevent="onSubmit" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room No</label>
          <input
            v-model="resident.roomNumber"
            type="text"
            id="roomNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input
            v-model="resident.name"
            type="text"
            id="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lineId">Line ID</label>
          <input
            v-model="resident.lineId"
            type="text"
            id="lineId"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

      
        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
          
            class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button 
            type="button"
            @click="cancel"
           class="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
        </div>
      </form>
      <p v-if="message" class="text-error mt-5">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const route = useRoute();

const resident = ref({
  roomNumber: '',
  name: '',
  lineId: '',
});
const message = ref('');

const fetchData = async () => {
  try {
    const response = await apiClient.get(`/resident/list/${route.params.id}`);
    if (response.data && response.data.resident) {
      resident.value = response.data.resident;
    } 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const cancel = () => {
  router.push('/resident-list');
};

const onSubmit = async () => {
  if (!resident.value.roomNumber || !resident.value.name || !resident.value.lineId) {
    console.error('Resident data is incomplete');
    return;
  }

  try {
    const response = await apiClient.put(`/resident/edit/${route.params.id}`, resident.value);
    const result = response.data;

    if (result.message === 'The resident does not exist!') {
      alert(result.message);
      return;
    }

    alert(result.message);
    router.push('/resident-list');
    if (result.status === 'ok') {
      router.push('/resident-list');
    }
  } catch (error) {
    // Check if error object exists and contains data property
    if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the server
      message.value = error.response.data.message;
    } 
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
