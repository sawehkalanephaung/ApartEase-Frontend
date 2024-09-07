<template>
  <h3 class="mb-10 text-2xl font-medium text-gray-700">Resident Management</h3>
  <div class="mt-4">
    <div class="flex flex-col justify-between mt-4 sm:flex-row items-left">
      <div class="relative flex items-center w-full max-w-md mb-4 sm:mb-0 sm:mr-4">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by Room Number or Name..."
          class="w-full px-4 py-2 pl-8 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          @keyup.enter="searchResident"
        />
        <div v-if="searchQuery" class="absolute inset-y-0 right-0 flex items-center pr-3">
          <button @click="clearSearch" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center mb-4 t-4 sm:mt- sm:mb-0 sm:mr-4">
        <label for="sort" class="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
        <select id="sort" v-model="sortCriteria" @change="sortResidents" class="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="roomNumber">Room Number</option>
          <option value="name">Name</option>
        </select>
      </div>
    <Popper hover placement="top">
      <button
        @click="onCreate"
        class="px-4 py-2 text-white rounded sm:w-full md:w-auto sm:ml-0 md:ml-3 bg-primary hover:bg-emerald-600"
      >
        <router-link to="/resident-create" class="flex items-center sm:flex-row md:flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span class="flex-none w-32">Create</span>
        </router-link>
      </button>
      <template #content>
        <div>Create new resident</div>
      </template>
    </Popper>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full leading-normal text-md">
        <thead>
          <tr>
            <th @click="toggleSort('roomNumber')" class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 cursor-pointer">
              Room No
              <span v-if="sortCriteria === 'roomNumber'">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="toggleSort('name')" class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 cursor-pointer">
              Name
              <span v-if="sortCriteria === 'name'">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="hidden px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200 md:table-cell">Email</th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="residents.length === 0">
            <td colspan="4" class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">No residents found.</td>
          </tr>
          <tr v-for="(u, index) in residents" :key="index">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ u.roomNumber }}</td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">{{ capitalizeName(u.name) }}</td>
            <td class="hidden px-5 py-5 text-sm bg-white border-b border-gray-200 md:table-cell">{{ u.lineId }}</td>
            <td class="flex-row px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
              <Popper hover placement="left"> 
              <button @click="() => onEdit(u.id)" class="mr-4 text-emerald-600 hover:text-emerald-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
                </svg>
              </button>
              <template #content>
                <div>Update</div>
              </template>
            </Popper>
            <Popper hover placement="right">
              <button @click="() => onDelete(u.id)" class="ml-4 text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
              <template #content>
                <div class="text-red-600">Delete</div>
              </template>
              </Popper>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination controls -->
      <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div class="flex justify-between flex-1 sm:hidden">
          <a @click="prevPage" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">Previous</a>
          <a @click="nextPage" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing {{ ' ' }} <span class="font-medium">{{ start + 1 }}</span> {{ ' ' }} to {{ ' ' }} <span class="font-medium">{{ end }}</span> {{ ' ' }} of {{ ' ' }} <span class="font-medium">{{ totalItems }}</span> {{ ' ' }} results
            </p>
          </div>
          <div>
            <nav class="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
              <a @click="prevPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 cursor-pointer rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
              </a>
              <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" :class="{ 'bg-emerald-600 text-white': page === currentPage }">{{ page }}</span>
              <a @click="nextPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 cursor-pointer rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Delete Confirmation Modal -->
  <DeleteConfirmationModal
    :show="showDeleteConfirm"
    @confirm-delete="confirmDelete"
    @close="showDeleteConfirm = false"
  />
  <router-view />
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ref, onMounted, watchEffect, watch } from 'vue';
import apiClient from '@/services/AxiosClient.js';
import router from '@/router';
import { usePagination } from '@/composables/usePagination';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import Popper from 'vue3-popper';

const searchQuery = ref('');
const residents = ref([]);
const showDeleteConfirm = ref(false);
const residentToDelete = ref(null);
const sortCriteria = ref('roomNumber'); // Default sort criteria
const sortOrder = ref('asc'); // Default sorting order

// capitelize resident name
const capitalizeName = (name) => {
  return name.replace(/\b\w/g, char => char.toUpperCase());
};
const sortResidents = () => {
  if (sortCriteria.value === 'roomNumber') {
    residents.value.sort((a, b) => {
      if (sortOrder.value === 'asc') {
        return a.roomNumber - b.roomNumber;
      } else {
        return b.roomNumber - a.roomNumber;
      }
    });
  } else if (sortCriteria.value === 'name') {
    residents.value.sort((a, b) => {
      if (sortOrder.value === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }
};

const toggleSort = (criteria) => {
  if (sortCriteria.value === criteria) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortCriteria.value = criteria;
    sortOrder.value = 'asc';
  }
  sortResidents();
};

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
      sortResidents(); // Sort residents after fetching data
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

const onDelete = (id) => {
  residentToDelete.value = id;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  try {
    await apiClient.delete(`/resident/del/${residentToDelete.value}`);
    fetchData();
    showDeleteConfirm.value = false;
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
      sortResidents(); // Sort residents after searching
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

// Watch for changes in searchQuery and fetch data if it's cleared
watch(searchQuery, (newQuery) => {
  if (newQuery === '') {
    fetchData();
  }
});

watchEffect(() => {
  fetchData();
});

const clearSearch = () => {
  searchQuery.value = '';
  fetchData();
};
</script>
