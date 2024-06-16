<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Create Resident</h3>
      <Form @submit="register" :validation-schema="schema" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room No</label>
          <Field
            v-model="roomNumber"
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
            v-model="name"
            type="text"
            id="name"
            name="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
          />
          <ErrorMessage name="name" class="text-red-500 text-xs italic" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lineId">Line ID</label>
          <Field
            v-model="lineId"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';

import * as yup from 'yup';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();

const roomNumber = ref('');
const name = ref('');
const lineId = ref('');
const message = ref('');

const schema = yup.object().shape({
  roomNumber: yup.string().required('Room number is required!'),
  name: yup.string().required('Name is required!'),
  lineId: yup.string().required('Line ID is required!'),
});


const register = async () => {
  try {
    const resident = {
      roomNumber: roomNumber.value,
      name: name.value,
      lineId: lineId.value,
    };
    const response = await apiClient.post('/resident/add', resident);
    if (response.status === 201) {
      alert(response.data.message);
      router.push('/resident-list');
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
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
