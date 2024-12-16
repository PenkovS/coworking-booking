import { createStore } from "vuex";
import apiClient from "../api/axios";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
    coworkings: [],
    bookings: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token); // Сохранение токена в локальное хранилище
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    SET_COWORKINGS(state, coworkings) {
      state.coworkings = coworkings;
    },
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await apiClient.post("/register", userData);
        commit("SET_TOKEN", response.data.token);
        commit("SET_USER", response.data.user);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post("/login", credentials);
        commit("SET_TOKEN", response.data.token);
        commit("SET_USER", response.data.user);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await apiClient.get("/user");
        commit("SET_USER", response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    },
    async logout({ commit }) {
      commit("CLEAR_AUTH");
    },
    async fetchCoworkings({ commit }) {
      try {
        const response = await apiClient.get("/coworkings");
        commit("SET_COWORKINGS", response.data);
      } catch (error) {
        console.error("Error fetching coworkings:", error);
      }
    },
    async fetchBookings({ commit }) {
      try {
        const response = await apiClient.get("/user/bookings");
        commit("SET_BOOKINGS", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
    async addBooking({ dispatch }, bookingData) {
      try {
        await apiClient.post("/bookings", bookingData);
        dispatch("fetchBookings"); // Обновить список бронирований
      } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
      }
    },
    async cancelBooking({ dispatch }, bookingId) {
      try {
        await apiClient.delete(`/bookings/${bookingId}`);
        dispatch("fetchBookings"); // Обновить список бронирований
      } catch (error) {
        console.error("Error cancelling booking:", error);
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userBookings: (state) => state.bookings,
    coworkings: (state) => state.coworkings,
  },
});

export default store;
