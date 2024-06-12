<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700">Create Role</h3>
      <form @submit.prevent="onSubmit" class="rounded px-8 pt-6 pb-8 mb-4">
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
      <p v-if="message" class="text-error mt-5">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import apiClient from '@/services/AxiosClient';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = ref('');

const role = ref({
  role_name: '',
});

const cancel = () => {
  router.push('/role-list');
};

const onSubmit = async () => {
  try {
    const response = await apiClient.post('/role/add', {
      role_name: role.value.role_name,
    });
     // Check if the response status is 200 (Created)
     if (response.status === 200) {
          // Show the message from the backend
          alert(response.data.message);
          // Redirect to resident list page after successful creation
          router.push('/role-list');
        } 
  } catch (error) {
    // Check if error object exists and contains data property
    if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the server
      message.value = error.response.data.message;
    } 
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
