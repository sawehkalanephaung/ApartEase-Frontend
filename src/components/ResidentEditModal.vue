<template>
    <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-between w-full px-4 py-4 text-sm font-medium leading-none select-none">
        <h2 class="ml-4 text-2xl font-medium text-gray-700">Edit Resident</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <Form v-else @submit="onSubmit" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="roomNumber">Room No</label>
          <Field
            v-model="resident.roomNumber"
            type="text"
            id="roomNumber"
            name="roomNumber"
            class="w-full px-3 py-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            :placeholder="originalRoomNo || 'Room Number'"
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
            class="w-full px-3 py-3 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            :placeholder="originalName || 'Name'"
          />
          <ErrorMessage name="name" class="text-xs italic text-red-500" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="lineId">Email</label>
          <Field
            v-model="resident.lineId"
            type="text"
            id="lineId"
            name="lineId"
            class="w-full px-3 py-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            placeholder="Email"
          />
          <ErrorMessage name="lineId" class="text-xs italic text-red-500" />
        </div>

        <div class="flex items-center justify-end mt-20 space-x-4">
          <button
            type="button"
            @click="cancel"
            class="w-full px-3 py-2 text-sm font-medium text-center text-black bg-transparent border-2 border-gray-600 rounded-xl hover:bg-gray-600 hover:text-white sm:px-6 sm:py-3 sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-full px-3 py-2 text-sm font-medium text-center text-white border-2 border-transparent bg-emerald-400 rounded-xl hover:bg-emerald-500 sm:px-6 sm:py-3 sm:text-base"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import apiClient from '@/services/AxiosClient.js';
import ToastNotification from '@/components/ToastNotification.vue';

const props = defineProps({
  show: Boolean,
  residentId: String,
});

const emit = defineEmits(['close']);



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


const resident = ref({
  roomNumber: '',
  name: '',
  lineId: '',
});
const originalName = ref('');
const originalRoomNo = ref('');
const message = ref('');
const loading = ref(true);
const error = ref(null);

const schema = yup.object().shape({
  roomNumber: yup.string().required('Room number is required!'),
  name: yup.string().required('Name is required!'),
  lineId: yup.string().email('Please include "@" in email address').required('Email is required!'),
});

const fetchData = async () => {
  try {
    const response = await apiClient.get(`/resident/list/${props.residentId}`);
    if (response.data && response.data.Resident) {
      resident.value = {
        lineId: response.data.Resident.lineId,
        name: response.data.Resident.name,
        roomNumber: response.data.Resident.roomNumber,
      };
      originalName.value = response.data.Resident.name;
      originalRoomNo.value = response.data.Resident.roomNumber;
    } else {
      error.value = 'Failed to load resident data. Please try again later.';
      showToastMessage('Failed to load resident data. Please try again later.', 'error');
    }
  } catch (err) {
    error.value = 'Failed to load resident data. Please try again later.';
    showToastMessage('Failed to load resident data. Please try again later.', 'error');
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the 'show' prop to fetch data when the modal is opened
watch(() => props.show, (newVal) => {
  if (newVal) {
    fetchData();
  }
});

const cancel = () => {
  emit('close');
};

const closeModal = () => {
  emit('close');
};

const onSubmit = async () => {
  try {
    if (!resident.value.name) {
      resident.value.name = originalName.value;
    }
    if (!resident.value.roomNumber) {
      resident.value.roomNumber = originalRoomNo.value;
    }

    const response = await apiClient.put(`/resident/edit/${props.residentId}`, resident.value);
    console.log(response.data.message);
    showToastMessage('Resident updated successfully!');
    emit('close');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      message.value = err.response.data.message;
      showToastMessage(message.value, 'error');
    } else {
      message.value = 'An error occurred during registration. Please try again.';
      showToastMessage('An error occurred during registration. Please try again.', 'error');
    }
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
