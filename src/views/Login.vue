<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p class="register-cta">
        Don't have an account? <router-link to="/register">Register here</router-link>.
      </p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post("/api/login", {
            email: this.email,
            password: this.password,
          });
          alert("Login successful!");
          // Redirect to dashboard or home
          this.$router.push("/dashboard");
        } catch (error) {
          console.error("Error logging in:", error);
          alert("Login failed. Please check your credentials.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .register-cta {
    margin-top: 15px;
  }
  </style>
  