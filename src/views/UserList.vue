

<template>
  <!-- Start Table with pagination -->
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Tables
    </h3>
    <div class="mt-8">
      <h2 class="text-xl font-semibold leading-tight text-gray-700">
        User Management Table
      </h2>

      <div class="mt-6">
        <div class="flex justify-between items-center mt-2 sm:mt-0">
          <div class="relative block w-full max-w-md" />
          <button @click="onCreate"
            class="px-4 py-2 text-sm font-semibold text-emerald-800 bg-emerald-300 rounded hover:bg-emerald-400 uppercase"
          >
            create user
          </button>
        </div>

        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    username
                  </th>

                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    role
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    status
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(u, index) in paginatedData" :key="index">
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ u.userName }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.role }}
                    </p>
                  </td>

                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <span
                      :class="`relative inline-block px-3 py-1 font-semibold text-${u.status}-900 leading-tight`"
                    >
                      <span
                        aria-hidden
                        :class="`absolute inset-0 bg-${u.status}-200 opacity-50 rounded-full`"
                      />
                      <span class="relative">{{ u.status }}</span>
                    </span>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center ">
                    <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                      <button  @click="() => onEdit(u.id)"  class="text-emerald-600 hover:text-emerald-900 mr-10">Edit</button>
                      <button @click="() => onDelete(u.id)" class="text-emerald-600 hover:text-emerald-900 ml-10">Delete</button>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
              <!-- Handle button -->
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
                  :disabled="end >= paginatedUserListTableData.length"
                  @click="nextPage"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Table with pagination -->
</template>

<script setup>

import router from '@/router';
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'

const rows = ref([])

const fetchData = async () => {
  try {
    // checkout api endpoint is correct
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

// check api end pint is correct
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




// ################################################################
// pagination

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
  if (end.value <rows.value.length) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
