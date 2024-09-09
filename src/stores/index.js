import { createStore } from 'vuex';
import apiClient from '@/services/AxiosClient.js';

// handle refresh page and keep user logged in
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const tokenFromLocalStorage = localStorage.getItem('token');
const costPerUnitFromLocalStorage = localStorage.getItem('costPerUnit');
const waterCostFromLocalStorage = localStorage.getItem('waterCost');
const rentCostFromLocalStorage = localStorage.getItem('rentCost');

export default createStore({
  state: {
    user: userFromLocalStorage || null,
    jwtToken: tokenFromLocalStorage || null,
    role: userFromLocalStorage?.role || 'user', // default
    costPerUnit: costPerUnitFromLocalStorage ? parseFloat(costPerUnitFromLocalStorage) : 3, // default cost per unit
    totalUnitUsage: 0,
    rentCost: rentCostFromLocalStorage ? parseFloat(rentCostFromLocalStorage) : 1000,
    waterCost: waterCostFromLocalStorage ? parseFloat(waterCostFromLocalStorage) : 100, // default water cost
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
    setWaterCost(state, cost) {
      state.waterCost = cost;
      localStorage.setItem('waterCost', cost); // Save to localStorage
    },
    setRentCost(state, cost) {
      state.rentCost = cost;
      localStorage.setItem('rentCost', cost); // Save to localStorage
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
    updateWaterCost({ commit }, cost) {
      commit('setWaterCost', cost);
    },
    updateRentCost({ commit }, cost) {
      commit('setRentCost', cost);
    },
    async fetchUnitData({ commit }) {
      try {
        const response = await apiClient.get('/unit/data');
        const data = response.data;
        commit('setCostPerUnit', data.costPerUnit);
        commit('setTotalUnitUsage', data.totalUnitUsage);
        commit('setWaterCost', data.waterCost);
        commit('setRentCost', data.rentCost);
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
    getWaterCost: (state) => state.waterCost,
    getRentCost: (state) => state.rentCost,
    getTotalBill: (state) => state.totalBill,
  },
});
