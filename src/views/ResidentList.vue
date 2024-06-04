<template>
  <h3 class="text-2xl font-medium text-gray-700">Resident Management</h3>
  <div class="mt-4">
    <h2 class="text-lg font-semibold leading-tight text-gray-700">Resident List</h2>
    <!--search bar here -->
    <div class="mt-4 flex flex-col sm:flex-row justify-between items-left">
      <div class="relative w-full max-w-md mb-4 sm:mb-0 sm:mr-4">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
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
      <button @click="toggleCreateModal" class="bg-primary hover:bg-emerald-400 text-white px-4 py-2 rounded text-sm">
        Create Resident
      </button>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table v-if="residents.length > 0" class="min-w-full leading-normal text-md">
        <thead>
          <tr>
            <!-- <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th> -->
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room No</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Line ID</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, index) in residents" :key="index">
            <!-- <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.id }}</td> -->
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.roomNumber }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.name }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ u.lineId }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button @click="() => onEdit(u.id)" class="text-emerald-600 hover:text-emerald-900 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                </svg>
              </button>
              <button @click="() => onDelete(u.id)" class="text-emerald-600 hover:text-emerald-900 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center text-gray-500 mt-4">
        No residents found.
      </div>

      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <a @click="prevPage" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Previous</a>
          <a @click="nextPage" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-xs text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ start + 1 }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ end }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ totalResidents }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a @click="prevPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
                <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />
              </a>
              <span v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative inline-flex items-center px-3 py-1 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" :class="{'bg-emerald-600 text-white': page === currentPage}">{{ page }}</span>
              <a @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
                <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Resident Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="isShowingCreateModal" class="modal-mask">
          <div class="modal-container">
            <ResidentCreateModal @close="toggleCreateModal" @resident-created="fetchData" />
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Edit Resident Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="isShowingEditModal" class="modal-mask">
          <div class="modal-container">
            <ResidentEditModal :id="selectedResidentId" @close="toggleEditModal" @resident-updated="fetchData" />
          </div>
        </div>
      </transition>
    </teleport>
  </div>
  <router-view />
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL, JWT_TOKEN } from '@/config'
import { useModal } from '@/useModal'
import ResidentCreateModal from '@/components/ResidentCreateModal.vue'
import ResidentEditModal from '@/components/ResidentEditModal.vue'

const searchQuery = ref(''); // Single ref for ID, room number, or name search
const { isShowing: isShowingCreateModal, toggle: toggleCreateModal } = useModal()
const { isShowing: isShowingEditModal, toggle: toggleEditModal } = useModal()

const selectedResidentId = ref(null)
const residents = ref([])
const totalResidents = ref(0)
const totalPages = ref(0)
const currentPage = ref(1)
const perPage = 5

// Fetch resident list from the backend API on component mount
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/resident/list`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': JWT_TOKEN,
      },
      params: {
        page: currentPage.value,
      },
    })
    const data = response.data.Resident
    residents.value = data.slice(0, -1) // Exclude the last item which contains pagination info
    const pageData = data[data.length - 1]
    totalPages.value = pageData.total_pages
    currentPage.value = pageData.page
    totalResidents.value = pageData.Resident
    totalResidents.value = pageData.total_resident
    console.log('Fetched residents:', residents.value) // Debugging line
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})

const onEdit = (id) => {
  selectedResidentId.value = id
  toggleEditModal()
}

const onDelete = async (id) => {
  try {
    await axios.delete(`${API_URL}/resident/del/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': JWT_TOKEN,
      },
    })
    fetchData()
  } catch (error) {
    console.error('Error deleting resident:', error)
  }
}

// search resident by room number or name
const searchResident = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", JWT_TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url;
    if (searchQuery.value.match(/^\d+$/)) {
      // If the search query is a number, search by room number
      url = `${API_URL}/resident/list/room?query=${searchQuery.value}&page=1`;
    } else {
      // Otherwise, search by name
      url = `${API_URL}/resident/list/name?query=${searchQuery.value}&page=1`;
    }

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (Array.isArray(result.Resident)) {
      residents.value = result.Resident; // Update residents with the search result
    } else {
      residents.value = [result]; // Update residents with the search result
    }
    totalPages.value = 1; // Update total pages count
    currentPage.value = 1; // Reset current page to 1
  } catch (error) {
    console.error("Error searching resident:", error);
  }
};

// Function to navigate to previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchData()
  }
}

// Function to navigate to next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchData()
  }
}

// Function to navigate to a specific page
const goToPage = (page) => {
  currentPage.value = page
  fetchData()
}

// Computed properties for start and end
const start = computed(() => (currentPage.value - 1) * perPage)
const end = computed(() => Math.min(start.value + perPage, totalResidents.value))
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
