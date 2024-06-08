import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    jwtToken: null,
    role:'user' // default
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setJwtToken(state, token) {
      state.jwtToken = token;
    },
    setRole(state, role) {
      state.role = role;
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    setJwtToken({ commit }, token) {
      commit('setJwtToken', token);
    },
  },
  getters: {
    getUser: (state) => state.user,
    getJwtToken: (state) => state.jwtToken,
  },
});
