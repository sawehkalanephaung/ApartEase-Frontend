
<template>
  <div class="flex items-center justify-center h-screen px-6">
    <div class="w-full max-w-xl p-6 bg-white rounded-md ">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">Create User Account</span>
      </div>

      <form class="mt-10" @submit.prevent="signup">
        <label class="block">
            <span class="block text-sm font-medium text-slate-700">Username</span>
            <input type="text" v-model="username" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500
            
            "/>
          </label>

          <label class="block mt-6">
            <span class="block text-sm font-medium text-slate-700">Password</span>
            <input type="password" v-model="password" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500
        
            "/>
          </label>

                <!-- user role -->
        <div>
          <div class="block mt-6">
            <span for="role" class="block text-sm font-medium text-slate-700">Role</span>
          </div>
          <div class="relative mt-1">
            <select id="role" name="role" required v-model="role" class="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 sm:text-sm">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

      
        <div class="flex items-center justify-between mt-10">
          <button type="submit" class="flex-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Create
          </button>
          <button type="button" @click="cancel" class="ml-2 flex-1 rounded-md border border-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-red-600 hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
            Cancel
          </button>
        </div>
      </form>
      <p v-if="message" class="text-red-500">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()



export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      password: '',
      role: 'User',
      message: ''
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('http://127.0.0.1:1234/signup', {
          username: this.username,
          password: this.password,
          admin: this.role === 'Admin'
        });
        this.message = response.data.message;
        this.$router.push('/userlist');
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
    cancel() {
    router.push('/userlist')
}
  }
};
</script>
