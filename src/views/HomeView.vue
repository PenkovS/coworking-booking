<template>
  <div class="home">
    <header class="home-header">
      <h1>Welcome to Coworking Booking</h1>
      <p>Find and book your perfect workspace!</p>
    </header>

    <div class="cta-buttons">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/register" class="button button-secondary"
        >Register</router-link
      >
    </div>

    <section class="coworkings-list">
      <h2>Available Coworkings</h2>
      <ul>
        <li v-for="coworking in coworkings" :key="coworking.id">
          <strong>{{ coworking.name }}</strong> - {{ coworking.location }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      coworkings: [], // Доступные коворкинги
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
  },
  mounted() {
    this.fetchCoworkings();
  },
};
</script>

<style scoped>
.home-header {
  text-align: center;
  margin-bottom: 20px;
}
.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}
.button {
  text-decoration: none;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border-radius: 5px;
}
.button-secondary {
  background: #6c757d;
}
.coworkings-list {
  max-width: 600px;
  margin: 0 auto;
}
</style>
