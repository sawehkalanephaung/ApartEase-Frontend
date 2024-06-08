<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700">Create User</h3>
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

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>


  <!-- Alert message -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import apiClient from '../services/AxiosClient'

const user = ref({
  username: '',
  password: '',
  role: '',
})

const cancel = () => {
  router.push('/userlist')
}

const onSubmit = () => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    username: user.value.username,
    password: user.value.password,
    role: user.value.role === 'user' ? 'user' : 'admin',
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': JWT_TOKEN,
    },
    body: raw,
    redirect: 'follow',
  };

  fetch(`${API_URL}/user/add`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === 'ok') {
        alert(result.message);
        router.push('/userlist');
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    });
  router.push('/userlist');
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
