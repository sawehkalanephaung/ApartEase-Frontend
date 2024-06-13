<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">User Edit</h3>

      <form @submit.prevent="onSubmit" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            id="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div class="mb-4 relative">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="user.password"
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <!-- eye password icon -->
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 mt-6">
              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 mt-6">
              <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
              <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role">Role</label>
          <select
            id="role"
            name="role"
            required
            v-model="user.role"
            class="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
          >
            <option v-for="role in roles" :key="role.id" :value="role.role_name">{{ role.role_name }}</option>
          </select>
        </div>

        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="isSubmitting"
          >
          {{ isSubmitting ? "Submitting..." : "Submit" }}
          </button>
          <button
            type="button"
            @click="cancel"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const route = useRoute();

const user = ref({
  username: '',
  password: '',
  role: '',
});

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
        role: response.data.User.has_admin_role.length > 0 ? response.data.User.has_admin_role[0].name : '', // Assuming the role is in the has_admin_role array
      };
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
    roles.value = response.data.Role.slice(0, -1); // Assuming the last item is pagination info
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

const onSubmit = async () => {
  if (!user.value.username || !user.value.password || !user.value.role) {
    console.error('User data is incomplete');
    return;
  }

  isSubmitting.value = true;

  try {
    const userData = {
      username: user.value.username,
      password: user.value.password,
      role: user.value.role,
    };
    console.log(`Submitting data to /user/edit/${route.params.id}`, user.value); // Debugging line
    const response = await apiClient.put(`/user/edit/${route.params.id}`, user.value);
    const result = response.data;

    if (result.message === 'The role does not exist!') {
      alert(result.message);
      message.value = result.message;
      isSubmitting.value = false;
      return;
    }
    router.push('/user-list');
  } catch (error) {
    console.error('Error updating data:', error);
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
