<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Create Resident</h3>

      <form @submit.prevent="register" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="roomNumber"
            >Room No</label
          >
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from "@/services/AxiosClient.js";

const router = useRouter();

const roomNumber = ref('');
const name = ref('');
const lineId = ref('');
const message = ref('');

const register = async () => {
  try {
    const resident = {
      roomNumber: roomNumber.value,
      name: name.value,
      lineId: lineId.value
    };
    const response = await apiClient.post("/resident/add", resident);
   
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
    // Check if error object exists and contains data property
    if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the server
      message.value = error.response.data.message;
    } else {
      // Display a generic error message
      message.value = 'An error occurred during registration. Please try again.';
    }
  }
};

const cancel = () => {
  router.push('/resident-list');
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
