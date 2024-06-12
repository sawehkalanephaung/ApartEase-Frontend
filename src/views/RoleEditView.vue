<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Edit Role</h3>
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <form v-else @submit.prevent="onSubmit" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role_name">Role Name</label>
          <input
            v-model="role.role_name"
            type="text"
            id="role_name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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
           class="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
        </div>
      </form>
      <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/AxiosClient';

const router = useRouter();
const route = useRoute();

const role = ref({ role_name: '' }); // Initialize with an empty object
const loading = ref(true); // Loading state
const error = ref(null); // Error state

const fetchData = async () => {
  try {
    const response = await apiClient.get(`/role/list/${route.params.id}`);
    if (response.data && response.data.Role) {
      role.value = response.data.Role;
    } else {
      throw new Error('Role not found');
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
    const response = await apiClient.put(`/role/edit/${route.params.id}`, {
      role_name: role.value.role_name,
    });
    // alert(response.data.message);
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
