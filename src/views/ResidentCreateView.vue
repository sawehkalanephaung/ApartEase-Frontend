<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-center text-gray-700">Create Resident</h3>
      <Form @submit="register" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="roomNumber">Room No</label>
          <Field
            v-model="roomNumber"
            type="text"
            id="roomNumber"
            name="roomNumber"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Room Number"
          />
          <ErrorMessage name="roomNumber" class="text-xs italic text-red-500" />
          <p v-if="message" class="mt-2 text-xs italic text-error">{{ message }}</p>
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="name">Name</label>
          <Field
            v-model="name"
            type="text"
            id="name"
            name="name"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Name"
          />
          <ErrorMessage name="name" class="text-xs italic text-red-500" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="lineId">Email</label>
          <Field
            v-model="lineId"
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
  lineId: yup.string().email('Email must be a valid email address').required('Email is required!'),
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
