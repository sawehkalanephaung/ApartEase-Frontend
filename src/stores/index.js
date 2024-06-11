import { createStore } from 'vuex';

// handle refresh page and keep user logged in
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const tokenFromLocalStorage = localStorage.getItem('token');
export default createStore({
  state: {
    // user: { username: 'admin' }, // Example user object with a username
    // user: null,
    // jwtToken: null,
    // role: 'user', // default
    user: userFromLocalStorage || null,
    jwtToken: tokenFromLocalStorage || null,
    role: userFromLocalStorage?.role || 'user', // default
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.role = user.role || 'user'; // ensure role is set
    },
    setJwtToken(state, token) {
      state.jwtToken = token;
    },
    setRole(state, role) {
      state.role = role;
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
