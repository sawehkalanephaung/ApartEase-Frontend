import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      // state.role = role;
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    getUser: (state) => state.user
  }
});

