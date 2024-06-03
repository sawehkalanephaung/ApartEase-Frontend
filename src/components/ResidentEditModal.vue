<template>
  <div>
    <h3 class="text-2xl font-medium text-gray-700">Update Resident</h3>
    <form @submit.prevent="onSubmit" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="id">ID</label>
        <input v-model="resident.id" type="text" id="id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required disabled />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="roomNumber">Room No</label>
        <input v-model="resident.roomNumber" type="text" id="roomNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
        <input v-model="resident.name" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lineId">Line ID</label>
        <input v-model="resident.lineId" type="text" id="lineId" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="flex items-center justify-between mt-10">
        <button type="submit" class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
        <button type="button" @click="$emit('close')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { API_URL, JWT_TOKEN, AUTHORIZATION } from '@/config'

const router = useRouter()
const route = useRoute()

const resident = ref({
  id: '',
  roomNumber: '',
  name: '',
  lineId: ''
})

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/resident/${route.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': JWT_TOKEN,
      },
    })
    const result = await response.json()
    resident.value.id = result.id
    resident.value.roomNumber = result.roomNumber
    resident.value.name = result.name
    resident.value.lineId = result.lineId
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})

const onSubmit = async () => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('x-access-token', JWT_TOKEN)
  myHeaders.append('Authorization', AUTHORIZATION)

  const raw = JSON.stringify({
    id: resident.value.id,
    roomNumber: resident.value.roomNumber,
    name: resident.value.name,
    lineId: resident.value.lineId
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${API_URL}/resident/edit`, requestOptions)
    const result = await response.json()
    alert(result.message)
    if (result.status === 'ok') {
      $emit('resident-updated')
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