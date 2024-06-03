<template>
      <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
    <h3 class="text-2xl font-medium text-gray-700">Create Resident</h3>
    <form @submit.prevent="onSubmit"  class="  rounded px-8 pt-6 pb-8 mb-4" >
  

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fname">Room No </label>
        <input
          v-model="resident.roomNumber"
          type="text"
          id="roomNumber"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lname">Name</label>
        <input
          v-model="resident.name"
          type="text"
          id="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

    
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Lind ID</label>
        <input
          v-model="resident.lineId"
          type="text"
          id="lineId"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="flex items-center justify-between mt-10">
        <button
          type="submit"
          class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
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
</div>
</template>

<script setup>
import { ref } from 'vue'
// import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { API_URL,JWT_TOKEN, AUTHORIZATION } from '@/config';


const resident = ref({
  roomNumber: '',
  name: '',
  lineId: ''
})
const name = ref('') 

const cancel = () => {
  // Redirect to resident list page when cancel button is clicked
  router.push('/residentlist')
}

const onSubmit =() => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('x-access-token', JWT_TOKEN)
  myHeaders.append('Authorization', AUTHORIZATION)

const raw = JSON.stringify({
  "roomNumber": resident.value.roomNumber,
  "name": resident.value.name,
  "lineId": resident.value.lineId

  // above code also correct
  // lineId: resident.value.lineId,
  // name: resident.value.name,
  // roomNumber: resident.value.roomNumber
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
// fetch(`)
fetch(`${API_URL}/resident/add`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    alert(result.message)
    if(result.status ==='ok'){
        // Emit an event to notify the parent component
        emit('residentCreated')
      router.push('/residentlist')
    }
  })
  .catch(error => {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    });
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
