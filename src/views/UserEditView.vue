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
          <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">Role</label>
          <select
            id="role"
            name="role"
            required
            v-model="user.role"
            class="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../services/AxiosClient'

const router = useRouter()
const route = useRoute()

const user = ref({
  username: '',
  password: '',
  role: '',
})

const fetchData = async () => {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('x-access-token', JWT_TOKEN)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    const response = await fetch(`${API_URL}/user/list/${route.params.id}`, requestOptions)
    if (!response.ok) {
      console.error('Error fetching user data:', response.status, response.statusText)
      return
    }
    const result = await response.json()
    if (!result.user) {
      console.error('User data not available in API response')
      return
    }
    user.value = result.user
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})

const cancel = () => {
  router.push('/userlist')
}

const onSubmit = async () => {
  if (!user.value.username || !user.value.password || !user.value.role) {
    console.error('User data is incomplete')
    return
  }

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('x-access-token', JWT_TOKEN)

  const raw = JSON.stringify({
    username: user.value.username,
    password: user.value.password,
    role: user.value.role,
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${API_URL}/user/edit/${route.params.id}`, requestOptions)
    const result = await response.json()

    if (result.message === 'The role does not exist!') {
      alert(result.message)
      return
    }

    alert(result.message)
    if (result.status === 'ok') {
      router.push('/userlist')
    }
  } catch (error) {
    console.error('Error updating data:', error)
  }
}
</script>
<style scoped>
/* Your scoped styles here */
</style>