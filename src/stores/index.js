import { createStore } from 'vuex';

export default createStore({
  state: {
    user: { username: 'admin' }, // Example user object with a username
    jwtToken: null,
    role: 'user', // default
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.role = user.role || 'user'; // ensure role is set
    },
    setJwtToken(state, token) {
      state.jwtToken = token;
    },
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
    getRole: (state) => state.role,
    getJwtToken: (state) => state.jwtToken,
  },
});
