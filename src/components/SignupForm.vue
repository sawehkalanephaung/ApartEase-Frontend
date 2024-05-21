<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create User account</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- create user form -->
      <form @submit.prevent="signup" class="space-y-6" action="#" method="POST">
        <div class>
          <div class="flex items-center justify-between">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          </div>
          <div class="mt-2">
            <input id="username" name="username" type="text" autocomplete="username" required="" v-model="username" class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
          </div>
      </div>

      <div class="mt-6">
          <div class="flex items-center justify-between">
            <label type="password" for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="username" name="username" type="text" autocomplete="username" required="" v-model="username" class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
          </div>
      </div>
        <div class="mt-6">
        <!-- user role -->
        <div>
          <div class="flex items-center justify-between">
            <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
          </div>
          <div class="mt-2">
            <select id="role" name="role" required v-model="role" class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 selection:focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="submit" class="flex-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Create
          </button>
          <button type="button" @click="cancel" class="ml-2 flex-1 rounded-md border border-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-red-600 hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
            Cancel
          </button>
        </div>
        </div>
      </form>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      password: '',
      admin: false,
      message: ''
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('http://127.0.0.1:1234/signup', {
          username: this.username,
          password: this.password,
          admin: this.admin
        });
        this.message = response.data.message;
        this.$router.push('/login');
      } catch (error) {
        this.message = error.response.data.message;
      }
    }
  }
};
</script>
