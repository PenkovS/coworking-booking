<template>
  <div class="user-dashboard">
    <h2>Your Bookings</h2>
    <ul v-if="bookings.length > 0">
      <li v-for="booking in bookings" :key="booking.id" class="booking-item">
        <span> {{ booking.coworkingName }} - {{ booking.date }} </span>
        <button @click="cancelBooking(booking.id)">Cancel</button>
      </li>
    </ul>
    <p v-else>You have no bookings yet.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookings: [], // Список бронирований пользователя
    };
  },
  methods: {
    async fetchBookings() {
      try {
        const response = await axios.get("/api/user/bookings"); // Запрос бронирований
        this.bookings = response.data;
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
    async cancelBooking(bookingId) {
      try {
        await axios.delete(`/api/bookings/${bookingId}`); // Удаление бронирования
        this.bookings = this.bookings.filter(
          (booking) => booking.id !== bookingId
        ); // Обновление списка
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking. Please try again.");
      }
    },
  },
  mounted() {
    this.fetchBookings(); // Загрузка бронирований при инициализации
  },
};
</script>

<style scoped>
.user-dashboard {
  max-width: 600px;
  margin: 0 auto;
}
.booking-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
