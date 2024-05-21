<!-- ResidentList.vue -->
<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Tables</h3>
    <div class="mt-8">
      <h2 class="text-xl font-semibold leading-tight text-gray-700">Resident List Table</h2>
      <!-- Search input and add room button -->
      <div class="mt-6">
        <!-- Your search input and add room button -->
      </div>

      <!-- Table -->
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <!-- Table headers -->
            <thead>
              <tr>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  room no
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  name
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  line id
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  status
                </th>
                <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <!-- Table body with pagination -->
            <tbody>
              <tr v-for="(u, index) in paginatedData" :key="index">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.room_no }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.name }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.line_id }}</td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <span :class="`relative inline-block px-3 py-1 font-semibold text-${u.status}-900 leading-tight`">
                    <span :class="`absolute inset-0 bg-${u.status}-200 opacity-50 rounded-full`"></span>
                    <span class="relative">{{ u.status }}</span>
                  </span>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                  <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                    <a href="#" class="text-emerald-600 hover:text-emerald-900 mr-10">Edit</a>
                    <a href="#" class="text-emerald-600 hover:text-emerald-900 ml-10">Delete</a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
            <span class="text-xs text-gray-900 xs:text-sm">
              Showing {{ start + 1 }} to {{ Math.min(end, paginatedResidentListTableData.length) }} of {{ paginatedResidentListTableData.length }} Entries
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
                :disabled="end >= paginatedResidentListTableData.length"
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
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTableData } from '../composables/useTableData'

const {
  paginatedResidentListTableData,
} = useTableData()

const itemsPerPage = 5
const currentPage = ref(1)

const start = computed(() => (currentPage.value - 1) * itemsPerPage)
const end = computed(() => start.value + itemsPerPage)

const paginatedData = computed(() =>
  paginatedResidentListTableData.value.slice(start.value, end.value),
)

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (end.value < paginatedResidentListTableData.value.length) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
