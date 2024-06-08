<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Edit Role</h3>
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
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../services/AxiosClient'


const router = useRouter()
const route = useRoute()

const role = ref({
  role_name: '',
})

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/role/list/${route.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': JWT_TOKEN,
      },
    })
    const result = await response.json()
    role.value = result.message
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})

const cancel = () => {
  router.push('/rolelist')
}

const onSubmit = async () => {
  try {
    const response = await fetch(`${API_URL}/role/edit/${route.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': JWT_TOKEN,
      },
      body: JSON.stringify({
        role_name: role.value.role_name,
      }),
    })
    const result = await response.json()
    alert(result.message)
    if (result.status === 'ok') {
      router.push('/rolelist')
    }
  } catch (error) {
    console.error('Error updating data:', error)
  }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
