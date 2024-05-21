
<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">Login Account</span>
      </div>

      <form class="mt-10" @submit.prevent="login">
        <label class="block">
            <span class="block text-sm font-medium text-slate-700">Username</span>
            <input type="text" v-model="username" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>

          <label class="block mt-6">
            <span class="block text-sm font-medium text-slate-700">Password</span>
            <input type="password" v-model="password" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>

      
        <div class="mt-10">
          <button
            type="submit"
            class="w-full px-3 py-2 text-sm text-center text-white bg-emerald-600 rounded-md focus:outline-none hover:bg-emerald-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <p class="text-red-500 mt-3">{{ message }}</p>
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
        this.$router.push('/');
      } catch (error) {
        this.message = error.response.data;
      }
    }
  }
};
</script>
