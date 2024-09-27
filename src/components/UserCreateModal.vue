<template>
   <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-between w-full px-4 py-4 text-sm font-medium leading-none select-none">
          <h2 class="ml-4 text-2xl font-medium text-gray-700">Create User</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Form @submit="register" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="username">Username</label>
            <Field
              v-model="user.username"
              type="text"
              id="username"
              name="username"
              class="w-full px-3 py-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
              placeholder="Username"
            />
            <ErrorMessage name="username" class="mt-1 text-xs italic text-red-500" />
            <p v-if="message" name="username" class="mt-1 text-xs italic text-red-500">{{ message }}</p>
          </div>
  
          <div class="relative mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="password">Password</label>
            <div class="relative">
              <Field
                v-model="user.password"
                :type="passwordVisible ? 'text' : 'password'"
                id="password"
                name="password"
                class="w-full px-3 py-3 pr-10 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
                placeholder="Password"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
              >
                <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
                  <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" class="text-xs italic text-red-500" />
          </div>
  
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="role">Role</label>
            <Field
              as="select"
              v-model="user.role"
              id="role"
              name="role"
              class="block w-full px-3 py-3 pr-10 text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 sm:text-sm"
            >
              <option v-for="role in roles" :key="role.id" :value="role.role_name" class="text-sm">
                {{ role.role_name }}
              </option>
            </Field>
            <ErrorMessage name="role" class="text-xs italic text-red-500" />
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
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Creating..." : "Create" }}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import apiClient from '@/services/AxiosClient.js';
  import ToastNotification from './ToastNotification.vue';



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
  
  const user = ref({
    username: '',
    password: '',
    role: '',
  });
  
  const isSubmitting = ref(false);
  const message = ref('');
  const passwordVisible = ref(false);
  const roles = ref([]);
  
  const fetchRoles = async () => {
    try {
      const response = await apiClient.get('/role/list');
      roles.value = response.data.Role;
    } catch (error) {
      console.error('Error fetching roles:', error);
      message.value = 'Error fetching roles. Please try again later.';
    }
  };
  
  onMounted(() => {
    fetchRoles();
  });
  
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required!')
      .min(4, 'Username must be at least 4 characters or more!')
      .max(10, 'Username must be at most 10 characters or less!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Password must be at least 6 characters or more!')
      .max(20, 'Password must be at most 20 characters or less!'),
    role: yup.string().required('Role is required!'),
  });
  
  const register = async (values) => {
    isSubmitting.value = true;
  
    try {
      const response = await apiClient.post('/user/add', values);
      const result = response.data;
      if (result.message === 'The role does not exist!') {
        message.value = result.message;
        showToastMessage(result.message, 'error');
        isSubmitting.value = false;
        return;
      }
 
      showToastMessage('User created successfully!', 'success');
      emit('close');
      window.location.reload();
  
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while creating the user. Please try again later.';
      console.error('Error creating user:', errorMessage);
      message.value = errorMessage;
      showToastMessage(errorMessage, 'error');
      isSubmitting.value = false;
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
  