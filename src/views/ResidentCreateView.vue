<template>
      <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
    <h3 class="text-2xl font-medium text-gray-700">Create Resident</h3>
    <form @submit.prevent="onSubmit"  class="  rounded px-8 pt-6 pb-8 mb-4" >
  

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fname">First Name</label>
        <input
          v-model="resident.fname"
          type="text"
          id="fname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lname">Last Name</label>
        <input
          v-model="resident.lname"
          type="text"
          id="lname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          v-model="resident.username"
          type="text"
          id="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
        <input
          v-model="resident.email"
          type="email"
          id="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="resident.password"
          type="password"
          id="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="avatar">Avatar URL</label>
        <input
          v-model="resident.avatar"
          type="text"
          id="avatar"
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

const resident = ref({
  fname: '',
  lname: '',
  username: '',
  password: '',
  email: '',
  avatar: ''


})

const cancel = () => {
  // Redirect to resident list page when cancel button is clicked
  router.push('/residentlist')
}


const onSubmit =() => {
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "fname": fname.value,
  "lname": lname.value,
  "username": username.value,
  "password": password.value,
  "email": email.value,
  "avatar": avatar.value,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://www.melivecode.com/api/users/create", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    alert(result.message)
    if(result.status ==='ok'){
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
