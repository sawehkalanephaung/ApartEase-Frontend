<template>
  <h3 class="text-2xl font-medium text-gray-700">Resident Management</h3>
  <div class="mt-4">
    <h2 class="text-lg font-semibold leading-tight text-gray-700">Resident List</h2>
    <div class="mt-4 flex flex-col sm:flex-row justify-between items-left">
      <div class="relative w-full max-w-md mb-4 sm:mb-0 sm:mr-4">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by Room Number or Name..."
          class="w-full px-4 py-2 pl-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          @keyup.enter="searchResident"
        />
      </div>
      <button @click="onCreate" class="bg-primary hover:bg-emerald-400 text-white px-4 py-2 rounded text-sm">
        Create Resident
      </button>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table v-if="residents.length > 0" class="min-w-full leading-normal text-md">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room No</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Line ID</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, index) in residents" :key="index">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.roomNumber }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.name }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.lineId }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button @click="() => onEdit(u.id)" class="text-emerald-600 hover:text-emerald-900 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button @click="() => onDelete(u.id)" class="text-emerald-600 hover:text-emerald-900 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center text-gray-500 mt-4">
        No residents found.
      </div>

     <!-- Pagination controls -->
     <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a @click="prevPage" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Previous</a>
      <a @click="nextPage" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing {{ ' ' }} <span class="font-medium">{{ start + 1 }}</span> {{ ' ' }} to {{ ' ' }} <span class="font-medium">{{ end }}</span> {{ ' ' }} of {{ ' ' }} <span class="font-medium">{{ totalItems }}</span> {{ ' ' }} results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a @click="prevPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" :class="{ 'bg-emerald-600 text-white': page === currentPage }">{{ page }}</span>
          <a @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
  </div>
  </div>
  <router-view />
</template>


<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ref, onMounted, watchEffect } from 'vue';
import apiClient from '@/services/AxiosClient.js';
import router from '@/router';
import { usePagination } from '@/composables/usePagination';

const searchQuery = ref('');
const residents = ref([]);

const fetchData = async () => {
  try {
    const response = await apiClient.get('/resident/list', {
      params: {
        page: currentPage.value,
      },
    });
    const data = response.data.Resident;

    // Check if the data includes pagination metadata
    if (data.length > 0) {
      // Assuming the last element contains the pagination metadata
      const pageData = data[data.length - 1];

      // Update pagination details from the metadata
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = pageData.total_resident;

      // Exclude the metadata from the residents array
      residents.value = data.slice(0, -1);
    } else {
      residents.value = [];
      totalPages.value = 0;
      totalItems.value = 0;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const { currentPage, totalPages, totalItems, start, end, prevPage, nextPage, goToPage } = usePagination(fetchData);

onMounted(() => {
  fetchData();
});

const onCreate = () => {
  router.push('/resident-create');
};

const onEdit = (id) => {
  router.push({ name: 'ResidentEditView', params: { id } });
};

const onDelete = async (id) => {
  try {
    await apiClient.delete(`/resident/del/${id}`);
    fetchData();
  } catch (error) {
    console.error('Error deleting resident:', error);
  }
};

const searchResident = async () => {
  try {
    let url;
    if (searchQuery.value.match(/^\d+$/)) {
      url = `/resident/list/room?query=${searchQuery.value}&page=1`;
    } else {
      url = `/resident/list/name?query=${searchQuery.value}&page=1`;
    }
    const response = await apiClient.get(url);
    const result = response.data.Resident;

    // Directly set the residents array to the search results
    if (Array.isArray(result)) {
      residents.value = result.slice(0, -1); // Assuming last item is metadata
      const pageData = result[result.length - 1];

      // Update pagination details for the search results
      totalPages.value = pageData.total_pages;
      currentPage.value = pageData.page;
      totalItems.value = residents.value.length;
    } else {
      residents.value = [result];
      totalPages.value = 1;
      currentPage.value = 1;
      totalItems.value = 1;
    }
  } catch (error) {
    console.error('Error searching resident:', error);
    residents.value = [];
    totalPages.value = 1;
    totalItems.value = 0;
  }
};


watchEffect(() => {
  fetchData();
});
</script>
