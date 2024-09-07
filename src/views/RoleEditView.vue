<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-center text-gray-700">Edit Role</h3>
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <form v-else @submit.prevent="onSubmit" class="px-8 pt-6 pb-8 mb-4 rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="role_name">Role Name</label>
          <input
            v-model="role.role_name"
            type="text"
            id="role_name"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            :placeholder="originalRoleName || 'Role Name'"
          />
          <div v-if="error" class="mt-1 text-xs italic text-red-500">{{ error }}</div>
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient';

const router = useRouter();
const route = useRoute();

const role = ref({ role_name: '' });
const originalRoleName = ref('');
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    console.log('Fetching data for role ID:', route.params.id); // Log the role ID
    const response = await apiClient.get(`/role/list/${route.params.id}`);
    console.log('API Response:', response.data); // Log the API response

    if (response.data && response.data.Role) { // Adjusted to match the API response structure
      role.value = {
        role_name: response.data.Role.name, // Map the 'name' property to 'role_name'
      };
      originalRoleName.value = response.data.Role.name; // Store the original role name
      console.log('Role Data:', role.value); // Log the role data
    } else {
      console.warn('No role data found in response:', response.data);
      error.value = 'Failed to load role data. Please try again later.';
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = 'Failed to load role data. Please try again later.';
  } finally {
    loading.value = false; // Set loading to false after fetching data
  }
};

onMounted(() => {
  fetchData();
});

const cancel = () => {
  router.push('/role-list');
};

const onSubmit = async () => {
  try {
    // If the role name field is left blank, use the original role name
    if (!role.value.role_name) {
      role.value.role_name = originalRoleName.value;
    }

    const response = await apiClient.put(`/role/edit/${route.params.id}`, {
      role_name: role.value.role_name,
    });
    alert(response.data.message);
    router.push('/role-list');
  } catch (err) {
    console.error('Error updating data:', err);
    error.value = "The name of this role is already in use.";
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
