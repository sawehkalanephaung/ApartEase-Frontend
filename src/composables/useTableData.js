// useTableData.js
import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useTableData() {
  const paginatedResidentListTableData = ref([])
  const paginatedUserListTableData = ref([])


  async function fetchData() {
    try {
      const [residentResponse, userResponse] = await Promise.all([
        axios.get('YOUR_BACKEND_API_URL_FOR_RESIDENT_LIST'),
        axios.get('YOUR_BACKEND_API_URL_FOR_USER_LIST')
         

      ])

      paginatedResidentListTableData.value = residentResponse.data
      paginatedUserListTableData.value = userResponse.data
    } catch (error) {
      console.error('Error fetching data:', error)
      
    }
  }

  onMounted(fetchData)

  return {
    paginatedResidentListTableData,
    paginatedUserListTableData
  }
}
