<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Edit Resident</h3>
      <Form @submit="onSubmit" :validation-schema="schema" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room No</label>
          <Field
            v-model="resident.roomNumber"
            type="text"
            id="roomNumber"
            name="roomNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Room Number"
          />
          <ErrorMessage name="roomNumber" class="text-red-500 text-xs italic" />
          <p v-if="message" class="text-error text-xs italic mt-2">{{ message }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <Field
            v-model="resident.name"
            type="text"
            id="name"
            name="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :placeholder="originalName || 'Name'"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lineId">Line ID</label>
          <Field
            v-model="resident.lineId"
            type="text"
            id="lineId"
            name="lineId"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Line ID"
          />
          <ErrorMessage name="lineId" class="text-red-500 text-xs italic" />
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
            class="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const route = useRoute();

const resident = ref({
  roomNumber: '',
  name: '',
  lineId: '',
});
const originalName = ref('');
const message = ref('');

const schema = yup.object().shape({
  roomNumber: yup.string().required('Room number is required!'),
  lineId: yup.string().required('Line ID is required!'),
});

const fetchData = async () => {
  try {
    console.log('Fetching data for resident ID:', route.params.id); // Log the resident ID
    const response = await apiClient.get(`/resident/list/${route.params.id}`);
    console.log('API Response:', response.data); // Log the API response

    if (response.data && response.data.Resident) { // Adjusted to match the API response structure
      resident.value = {
        lineId: response.data.Resident.lineId,
        name: response.data.Resident.name,
        roomNumber: response.data.Resident.roomNumber,
      };
      originalName.value = response.data.Resident.name; // Store the original name
      console.log('Resident Data:', resident.value); // Log the resident data
    } else {
      console.warn('No resident data found in response:', response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const cancel = () => {
  router.push('/resident-list');
};

const onSubmit = async () => {
  try {
    // If the name field is left blank, use the original name
    if (!resident.value.name) {
      resident.value.name = originalName.value;
    }

    const response = await apiClient.put(`/resident/edit/${route.params.id}`, resident.value);
    const result = response.data;
    alert(result.message);
    router.push('/resident-list');
    if (result.status === 'ok') {
      router.push('/resident-list');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the server
      message.value = error.response.data.message;
    } else {
      // Display the error message from the server
      message.value = 'An error occurred during registration. Please try again.';
    }
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
