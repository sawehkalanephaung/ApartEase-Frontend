// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     user: null
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user;
//     }
//   },
//   actions: {
//     login({ commit }, user) {
//       // Simulate login
//       // In a real app, you'd make an API call here and handle authentication
//       commit('setUser', user);
//     }
//   },
//   getters: {
//     getUser: (state) => state.user
//   }
// });

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
