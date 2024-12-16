<template>
  <div class="booking-form">
    <h2>Book Your Workspace</h2>
    <form @submit.prevent="submitBooking">
      <div class="form-group">
        <label for="coworking">Select Coworking:</label>
        <select v-model="selectedCoworking" required>
          <option
            v-for="coworking in coworkings"
            :key="coworking.id"
            :value="coworking.id"
          >
            {{ coworking.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Select Date:</label>
        <input type="date" v-model="selectedDate" required />
      </div>

      <button type="submit" :disabled="!selectedCoworking || !selectedDate">
        Book Now
      </button>
    </form>
    <p v-if="bookingSuccess" class="success-message">Booking successful!</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      coworkings: [], // Список доступных коворкингов
      selectedCoworking: null, // Выбранный коворкинг
      selectedDate: "", // Выбранная дата
      bookingSuccess: false, // Флаг успешного бронирования
    };
  },
  methods: {
    async fetchCoworkings() {
      try {
        const response = await axios.get("/api/coworkings"); // Запрос списка коворкингов
        this.coworkings = response.data;
      } catch (error) {
        console.error("Error fetching coworkings:", error);
      }
    },
    async submitBooking() {
      try {
        const bookingData = {
          coworkingId: this.selectedCoworking,
          date: this.selectedDate,
        };
        await axios.post("/api/bookings", bookingData); // Отправка данных бронирования
        this.bookingSuccess = true;
        this.resetForm();
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Failed to book workspace. Please try again.");
      }
    },
    resetForm() {
      this.selectedCoworking = null;
      this.selectedDate = "";
    },
  },
  mounted() {
    this.fetchCoworkings(); // Получение списка коворкингов при монтировании компонента
  },
};
</script>

<style scoped>
/* Стили для формы бронирования */
.booking-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

select,
input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}
</style>
