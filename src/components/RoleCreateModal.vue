<template>
    <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-between w-full px-4 py-4 text-sm font-medium leading-none select-none">
          <h2 class="ml-4 text-2xl font-medium text-gray-700">Create Role</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Form @submit="onSubmit" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="role_name">Role Name</label>
            <Field
              v-model="role.role_name"
              type="text"
              id="role_name"
              name="role_name"
              class="w-full px-3 py-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
              placeholder="Role Name"
            />
            <ErrorMessage name="role_name" class="mt-1 text-xs italic text-red-500" />
            <p v-if="message" class="mt-1 text-xs italic text-red-500">{{ message }}</p>
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
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import apiClient from '@/services/AxiosClient.js';
  import ToastNotification from '@/components/ToastNotification.vue';


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

  
  const props = defineProps({
    show: Boolean,
  });
  
  const emit = defineEmits(['close']);
  
  const role = ref({
    role_name: '',
  });
  
  const message = ref('');
  
  const schema = yup.object().shape({
    role_name: yup.string().required('Role name is required!'),
  });
  
  const onSubmit = async (values) => {
    try {
      const response = await apiClient.post('/role/add', values);
      if (response.status === 200) {
        console.log(response.data.message);
        showToastMessage('Role created successfully!');
        emit('close');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.value = error.response.data.message;
      } else {
        message.value = 'An error occurred during registration. Please try again.';
        showToastMessage('An error occurred during registration. Please try again.', 'error');
      }
    }
  };
  
  const cancel = () => {
    emit('close');
  };
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  /* Your scoped styles here */
  </style>
  