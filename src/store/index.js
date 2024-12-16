import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    user: null, // Данные о текущем пользователе
    bookings: [], // Список бронирований пользователя
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings;
    },
    ADD_BOOKING(state, booking) {
      state.bookings.push(booking);
    },
    REMOVE_BOOKING(state, bookingId) {
      state.bookings = state.bookings.filter((b) => b.id !== bookingId);
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await axios.get("/api/user");
        commit("SET_USER", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async fetchBookings({ commit }) {
      try {
        const response = await axios.get("/api/user/bookings");
        commit("SET_BOOKINGS", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
    async addBooking({ commit }, booking) {
      try {
        const response = await axios.post("/api/bookings", booking);
        commit("ADD_BOOKING", response.data);
      } catch (error) {
        console.error("Error adding booking:", error);
      }
    },
    async cancelBooking({ commit }, bookingId) {
      try {
        await axios.delete(`/api/bookings/${bookingId}`);
        commit("REMOVE_BOOKING", bookingId);
      } catch (error) {
        console.error("Error cancelling booking:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userBookings: (state) => state.bookings,
  },
});

export default store;
