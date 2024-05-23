<!-- ResidentList.vue -->
<template>

    <h3 class="text-3xl font-medium text-gray-700">Tables</h3>
    <div class="mt-8">
      <h2 class="text-xl font-semibold leading-tight text-gray-700">Resident List Table</h2>
      <!-- Search input and add room button -->
      <div class="mt-6">
        <!-- Your search input and add room button -->
        <div class="flex justify-between items-center mt-2 sm:mt-0">
          <div class="relative block w-full max-w-md">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
                <path
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                />
              </svg>
            </span>

            <input
              placeholder="Search"
              class="block min-w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline:non"
            >
          </div>
      
          <!-- Add New Room Button -->
          <button @click="onCreate" class="flex px-4 py-2 ml-3">
            <div class="flex items-center justify-center">
              <router-link to="/residentlist/add-room" class="h-12 w-12 rounded-full bg-emerald-300 hover:bg-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-10 0 30 10" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 stroke-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </router-link>
            </div>
          </button>
        </div>
      </div>


      
      <!-- Table -->
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <!-- Table headers -->
            <thead>
              <tr>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  ID
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  First Name
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Last Name
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  username
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <!-- Table body with pagination -->
            <tbody>
              <tr v-for="(u, index) in paginatedData" :key="index">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.id }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.fname }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.lname }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.username }}</td>

                <!-- <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <span :class="`relative inline-block px-3 py-1 font-semibold text-${u.status}-900 leading-tight`">
                    <span :class="`absolute inset-0 bg-${u.status}-200 opacity-50 rounded-full`"></span>
                    <span class="relative">{{ u.status }}</span>
                  </span>
                </td> -->
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                  <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                    <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                    <button @click="() => onEdit(u.id)" class="text-emerald-600 hover:text-emerald-900 mr-10">Edit</button>
                    <button @click="() => onDelete(u.id)" class="text-emerald-600 hover:text-emerald-900 ml-10">Delete</button>
                  </span>
        
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
            <span class="text-xs text-gray-900 xs:text-sm">
              Showing {{ start + 1 }} to {{ Math.min(end, rows.length) }} of {{ rows.length }} Entries
            </span>
            <div class="flex justify-between w-full mt-2 xs:mt-0">
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

const raw = JSON.stringify({
  "id": id
});

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


const onCreate=()=>{
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
