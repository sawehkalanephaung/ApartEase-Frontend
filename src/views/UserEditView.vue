<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-center text-gray-700">User Edit</h3>

      <Form @submit="onSubmit" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="username">Username</label>
          <Field
            v-model="user.username"
            type="text"
            id="username"
            name="username"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 "
            :placeholder="originalUsername || 'Username'"
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
              class="w-full px-3 py-2 pr-10 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 "
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
            >
              <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
              </svg>
            </button>
          </div>
          <ErrorMessage name="password" class="mt-1 text-xs italic text-red-500" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="role">Role</label>
          <Field
            as="select"
            v-model="user.role"
            id="role"
            name="role"
            class="block w-full px-3 py-2 pr-10 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600 sm:text-sm"
          >
            <option v-for="role in roles" :key="role.id" :value="role.role_name">{{ role.role_name }}</option>
          </Field>
          <ErrorMessage name="role" class="text-xs italic text-red-500" />
        </div>

        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Submitting..." : "Submit" }}
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
import apiClient from '@/services/AxiosClient.js';
import { useField, Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();
const route = useRoute();

const user = ref({
  username: '',
  password: '',
  role: '',
});
const originalUsername = ref('');
const isSubmitting = ref(false);
const message = ref("");
const passwordVisible = ref(false); // State to track password visibility
// list all role in roles selection
const roles = ref([]);

const fetchData = async () => {
  try {
    console.log('Fetching data for user ID:', route.params.id); // Log the user ID
    const response = await apiClient.get(`/user/list/${route.params.id}`);
    console.log('API Response:', response.data); // Log the API response

    if (response.data && response.data.User) {
      user.value = {
        username: response.data.User.username,
        password: '', // Password is not returned by the API, so set it to an empty string
        role: response.data.User.role
      };
      originalUsername.value = response.data.User.username; // Store the original username
      console.log('User Data:', user.value); // Log the user data
    } else {
      console.warn('No user data found in response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchRoles = async () => {
  try {
    const response = await apiClient.get('/role/list');
    roles.value = response.data.Role; // role will list based on pagination info
    console.log('Roles Data:', roles.value); // Log the roles data
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

onMounted(() => {
  fetchData();
  fetchRoles();
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const cancel = () => {
  router.push('/user-list');
};

const onSubmit = async (values) => {
  isSubmitting.value = true;

  try {
    const response = await apiClient.put(`/user/edit/${route.params.id}`, values);
    const result = response.data;
    if (result.message === 'The role does not exist!') {
      message.value = result.message;
      isSubmitting.value = false;
      return;
    }
    router.push('/user-list');
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'An error occurred while updating the user. Please try again later.';
    console.error('Error updating user:', errorMessage);
    if (error.response && error.response.status === 409) {
      message.value = 'The username already exists';
    } else {
      message.value = errorMessage;
    }
    message.value = errorMessage;
    isSubmitting.value = false;
  }
};

// Vee-validate schema
const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!')
    .min(4, 'Username must be at least 4 characters or more!')
    .max(20, 'Username must be at most 20 characters or less!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(6, 'Password must be at least 6 characters or more!')
    .max(20, 'Password must be at most 20 characters or less!'),
  role: yup.string().required('Role is required!'),
});
</script>

<style scoped>
/* Your scoped styles here */
</style>
