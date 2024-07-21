<template>
<div class="flex items-center justify-center h-full">
      <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
        <h3 class="text-2xl font-medium text-gray-700 text-center">New Unit</h3>
        <Form @submit="create" :validation-schema="schema" class="rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room Number</label>
            <Field
                v-model="roomNumber"
                type="text"
                id="roomNumber"
                name="roomNumber"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter room number"
            />
            <ErrorMessage name="roomNumber" class="text-red-500 text-xs italic" />
            <div v-if="roomNumberError" class="text-red-500 text-xs italic">{{ roomNumberError }}</div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="numberOfUnits">Number of Units</label>
            <Field
                v-model="numberOfUnits"
                type="text"
                id="numberOfUnits"
                name="numberOfUnits"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="No of Units"
            />
            <ErrorMessage name="numberOfUnits" class="text-red-500 text-xs italic" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="extractionStatus">Extraction Status</label>
            <Field
                v-model="extractionStatus"
                type="text"
                id="extractionStatus"
                name="extractionStatus"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Extraction status"
            />
            <ErrorMessage name="extractionStatus" class="text-red-500 text-xs italic" />
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
        <div v-if="message" class="mt-4 text-red-500 text-xs italic">{{ message }}</div>
      </div>
    </div>
    <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">New Unit</h3>
      <Form @submit="create" :validation-schema="schema" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room Number</label>
          <Field as="select" v-model="roomNumber" id="roomNumber" name="roomNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select a room number</option>
            <option v-for="room in availableRoomNumbers" :key="room" :value="room">{{ room }}</option>
          </Field>
          <ErrorMessage name="roomNumber" class="text-red-500 text-xs italic" />
          <div v-if="roomNumberError" class="text-red-500 text-xs italic">{{ roomNumberError }}</div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="numberOfUnits">Number of Units</label>
          <Field
              v-model="numberOfUnits"
              type="text"
              id="numberOfUnits"
              name="numberOfUnits"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="No of Units"
          />
          <ErrorMessage name="numberOfUnits" class="text-red-500 text-xs italic" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="extractionStatus">Extraction Status</label>
          <Field
              v-model="extractionStatus"
              type="text"
              id="extractionStatus"
              name="extractionStatus"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Extraction status"
          />
          <ErrorMessage name="extractionStatus" class="text-red-500 text-xs italic" />
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
      <div v-if="message" class="mt-4 text-red-500 text-xs italic">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();

const roomNumber = ref('');
const numberOfUnits = ref('');
const extractionStatus = ref('');
const message = ref('');
const roomNumberError = ref('');
const existingRoomNumbers = ref([]);
const usedRoomNumbers = ref([]);
const availableRoomNumbers = ref([]);

const schema = yup.object().shape({
  roomNumber: yup.string().required('Room number is required!'),
  numberOfUnits: yup.string().required('Unit number is required!'),
  extractionStatus: yup.string().required('Extraction Status is required!'),
});

const fetchExistingRoomNumbers = async () => {
  try {
    const response = await apiClient.get('/resident/list');
    const data = response.data.Resident;
    existingRoomNumbers.value = data.map(resident => resident.roomNumber);
    filterAvailableRoomNumbers();
  } catch (error) {
    console.error('Error fetching existing room numbers:', error);
  }
};

const fetchUsedRoomNumbers = async () => {
  try {
    const response = await apiClient.get('/unit/list');
    const data = response.data.Unit;
    usedRoomNumbers.value = data.map(unit => unit.res_room);
    filterAvailableRoomNumbers();
  } catch (error) {
    console.error('Error fetching used room numbers:', error);
  }
};

const filterAvailableRoomNumbers = () => {
  if (existingRoomNumbers.value.length > 0 && usedRoomNumbers.value.length > 0) {
    availableRoomNumbers.value = existingRoomNumbers.value.filter(room => !usedRoomNumbers.value.includes(room));
  } else if (existingRoomNumbers.value.length > 0) {
    availableRoomNumbers.value = existingRoomNumbers.value;
  }
};

onMounted(() => {
  fetchExistingRoomNumbers();
  fetchUsedRoomNumbers();
});

const create = async () => {
  if (usedRoomNumbers.value.includes(roomNumber.value)) {
    roomNumberError.value = 'Room number already used!';
    return;
  } else {
    roomNumberError.value = '';
  }

  try {
    const units = {
      res_room: roomNumber.value,
      numberOfUnits: numberOfUnits.value,
      extractionStatus: extractionStatus.value,
    };
    const response = await apiClient.post('/unit/add', units);
    if (response.status === 200) {
      alert(response.data.message);
      router.push('/unit-management');
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      message.value = 'An error occurred during create new unit data. Please try again.';
    }
  }
};

const cancel = () => {
  router.push('/unit-management');
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
