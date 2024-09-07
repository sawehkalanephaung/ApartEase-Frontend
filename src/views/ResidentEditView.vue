<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-center text-gray-700">Edit Resident</h3>
      <Form @submit="onSubmit" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="roomNumber">Room No</label>
          <Field
            v-model="resident.roomNumber"
            type="text"
            id="roomNumber"
            name="roomNumber"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            :placeholder="originalRoomNo ||'Room Number' "
          />
          <ErrorMessage name="roomNumber" class="text-xs italic text-red-500" />
          <p v-if="message" class="mt-2 text-xs italic text-error">{{ message }}</p>
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="name">Name</label>
          <Field
            v-model="resident.name"
            type="text"
            id="name"
            name="name"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            :placeholder="originalName || 'Name'"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="lineId">Email</label>
          <Field
            v-model="resident.lineId"
            type="text"
            id="lineId"
            name="lineId"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
          <ErrorMessage name="lineId" class="text-xs italic text-red-500" />
        </div>

        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            type="button"
            @click="cancel"
            class="px-4 py-2 font-bold bg-white border-2 rounded text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white"
          >
            Cancel
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
const originalRoomNo = ref('');
const message = ref('');

const schema = yup.object().shape({
  roomNumber: yup.string().required('Room number is required!'),
  lineId: yup.string().email('Please include "@" in email address ').required('Email is required!'),
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
      originalRoomNo.value = response.data.Resident.roomNumber; // Store the original room number
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
    if (!resident.value.roomNumber) {
      resident.value.roomNumber = originalRoomNo.value;
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
