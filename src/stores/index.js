import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, user) {
      // Simulate login
      // In a real app, you'd make an API call here and handle authentication
      commit('setUser', user);
    }
  },
  getters: {
    getUser: (state) => state.user
  }
});

