<template>
  <div>
    <h3 class="text-2xl font-medium text-gray-700">Update Resident</h3>
    <form @submit.prevent="onSubmit" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="id">ID</label>
        <input
          v-model="resident.id"
          type="text"
          id="id"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          disabled
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fname">First Name</label>
        <input
          v-model="resident.fname"
          type="text"
          id="fname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lname">Last Name</label>
        <input
          v-model="resident.lname"
          type="text"
          id="lname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          v-model="resident.username"
          type="text"
          id="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          v-model="resident.email"
          type="email"
          id="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="resident.password"
          type="password"
          id="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">Avatar URL</label>
        <input
          v-model="resident.avatar"
          type="text"
          id="avatar"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="flex items-center justify-between mt-10">
        <button
          type="submit"
          class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const resident = ref({
  id: '',
  fname: '',
  lname: '',
  username: '',
  password: '',
  email: '',
  avatar: ''
})

const fetchData = async () => {
  try {
    const response = await fetch(`https://www.melivecode.com/api/users/${route.params.id}`)
    const result = await response.json()
    resident.value.id = result.user.id
    resident.value.fname = result.user.fname
    resident.value.lname = result.user.lname
    resident.value.username = result.user.username
    resident.value.password = result.user.password
    resident.value.email = result.user.email
    resident.value.avatar = result.user.avatar
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})

const cancel = () => {
  router.push('/residentlist')
}

const onSubmit = async () => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    "id": resident.value.id,
    "fname": resident.value.fname,
    "lname": resident.value.lname,
    "username": resident.value.username,
    "password": resident.value.password,
    "email": resident.value.email,
    "avatar": resident.value.avatar
  })

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  try {
    const response = await fetch("https://www.melivecode.com/api/users/update", requestOptions)
    const result = await response.json()
    alert(result.message)
    if (result.status === 'ok') {
      router.push('/residentlist')
    }
  } catch (error) {
    console.error('Error updating data:', error)
  }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
