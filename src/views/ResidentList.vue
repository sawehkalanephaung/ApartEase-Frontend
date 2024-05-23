<!-- ResidentList.vue -->
<template>
  <h3 class="text-3xl font-medium text-gray-700">Tables</h3>
  <div class="mt-8">
    <h2 class="text-xl font-semibold leading-tight text-gray-700">Resident List Table</h2>
    <!-- Search input and add room button -->
    <div class="mt-6 flex justify-between items-center">
      <div class="relative w-full max-w-md">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"/>
          </svg>
        </span>
        <input
          placeholder="Search"
          class="w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border rounded focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        >
      </div>
      <button @click="onCreate" class="ml-3 bg-emerald-300 hover:bg-emerald-400 text-white px-4 py-2 rounded">
        <router-link to="/residentlist/add-room" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span class="ml-2">Add Room</span>
        </router-link>
      </button>
    </div>

    <!-- Table -->
    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room No</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">First Name</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, index) in paginatedData" :key="index">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.id }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.fname }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.lname }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.username }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button @click="() => onEdit(u.id)" class="text-emerald-600 hover:text-emerald-900 mr-2">Edit</button>
              <button @click="() => onDelete(u.id)" class="text-emerald-600 hover:text-emerald-900 ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-xs text-gray-700">Showing {{ start + 1 }} to {{ Math.min(end, rows.length) }} of {{ rows.length }} Entries</span>
        <div class="flex space-x-2">
          <button
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Prev
          </button>
          <button
            class="px-4 py-2 text-sm font-semibold text-emerald-800 bg-emerald-300 rounded hover:bg-emerald-400"
            :disabled="end >= rows.length"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script setup>
import router from '@/router';
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'

const rows = ref([])

const fetchData = async () => {
  try {
    const response = await axios.get('https://www.melivecode.com/api/users')
    rows.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})

const onEdit = (id) => {
  router.push('/resident-edit-view/'+id)
}

const onDelete = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "id": id });

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://www.melivecode.com/api/users/delete", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message)
      fetchData()
    })
    .catch((error) => console.error(error));
}

const onCreate = () => {
  router.push('/resident-create-view')
}

// handle pagination
const itemsPerPage = 5
const currentPage = ref(1)

const start = computed(() => (currentPage.value - 1) * itemsPerPage)
const end = computed(() => start.value + itemsPerPage)

const paginatedData = computed(() => rows.value.slice(start.value, end.value))

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (end.value < rows.value.length) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
