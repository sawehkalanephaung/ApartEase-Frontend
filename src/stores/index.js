import { createStore } from 'vuex';
import apiClient from '@/services/AxiosClient.js';

// handle refresh page and keep user logged in
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const tokenFromLocalStorage = localStorage.getItem('token');

export default createStore({
  state: {
    user: userFromLocalStorage || null,
    jwtToken: tokenFromLocalStorage || null,
    role: userFromLocalStorage?.role || 'user', // default
    costPerUnit: 3, // default cost per unit
    totalUnitUsage: 0,
    rentCost: 0,
    waterCost: 0,
    totalBill: 0,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.role = user ? user.role : 'user'; // ensure role is set
    },
    setJwtToken(state, token) {
      state.jwtToken = token;
    },
    setRole(state, role) {
      state.role = role;
    },
    setCostPerUnit(state, cost) {
      state.costPerUnit = cost;
      localStorage.setItem('costPerUnit', cost); // Save to localStorage
    },
    setTotalUnitUsage(state, usage) {
      state.totalUnitUsage = usage;
    },
    setRentCost(state, cost) {
      state.rentCost = cost;
    },
    setWaterCost(state, cost) {
      state.waterCost = cost;
    },
    setTotalBill(state, bill) {
      state.totalBill = bill;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    setJwtToken({ commit }, token) {
      commit('setJwtToken', token);
    },
    updateCostPerUnit({ commit }, cost) {
      commit('setCostPerUnit', cost);
    },
    async fetchUnitData({ commit }) {
      try {
        const response = await apiClient.get('/unit/data');
        const data = response.data;
        commit('setCostPerUnit', data.costPerUnit);
        commit('setTotalUnitUsage', data.totalUnitUsage);
        commit('setRentCost', data.rentCost);
        commit('setWaterCost', data.waterCost);
        commit('setTotalBill', data.totalBill);
      } catch (error) {
        console.error('Error fetching unit data:', error);
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
    getRole: (state) => state.role,
    getJwtToken: (state) => state.jwtToken,
    getCostPerUnit: (state) => state.costPerUnit,
    getTotalUnitUsage: (state) => state.totalUnitUsage,
    getRentCost: (state) => state.rentCost,
    getWaterCost: (state) => state.waterCost,
    getTotalBill: (state) => state.totalBill,
  },
});
