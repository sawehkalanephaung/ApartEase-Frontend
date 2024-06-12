<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700">Create Resident</h3>
      <form @submit.prevent="register" class="rounded px-8 pt-6 pb-8 mb-4 needs-validation" novalidate>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room No</label>
          <input
            v-model="roomNumber"
            type="text"
            id="roomNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <p v-if="!roomNumber && submitted" class="text-red-500 text-xs italic">
            Please enter the room number
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <p v-if="!name && submitted" class="text-red-500 text-xs italic">
            Please enter the resident name
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lineId">Line ID</label>
          <input
            v-model="lineId"
            type="text"
            id="lineId"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <p v-if="!lineId && submitted" class="text-red-500 text-xs italic">
            Please enter the resident Line ID
          </p>
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
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/AxiosClient';

const router = useRouter();

const roomNumber = ref('');
const name = ref('');
const lineId = ref('');
const submitted = ref(false);

const register = async () => {
  submitted.value = true;
  if (roomNumber.value && name.value && lineId.value) {
    try {
      const response = await apiClient.post('/resident/add', {
        roomNumber: roomNumber.value,
        name: name.value,
        lineId: lineId.value,
      });

     // Check if the response status is 201 (Created)
    if (response.status === 201) {
          // Show the message from the backend
          alert(response.data.message);
          // Redirect to resident list page after successful creation
          router.push('/resident-list');
        } else {
          // Display the message from the backend if status is not 201
          alert(response.data.message);
        }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  } else {
    // Show validation messages
    alert('Please fill in all required fields.');
  }
};

const cancel = () => {
  // Handle cancel action
  router.push('/resident-list'); 
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
