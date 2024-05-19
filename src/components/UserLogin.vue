<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- login form -->
      <form @submit.prevent="login" class="space-y-6" action="#" method="POST">
        <div>
          <div class="flex items-center justify-between">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          </div>
          <div class="mt-2">
            <input id="username" name="username" type="text" v-model="username" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" required />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="password" class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Login
          </button>
        </div>
      </form>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:1234/login', {
          username: this.username,
          password: this.password
        });
        const userData = response.data.User;
        localStorage.setItem('token', userData.token);
        this.$router.push('/SideNav');
      } catch (error) {
        this.message = error.response.data;
      }
    }
  }
};
</script>
