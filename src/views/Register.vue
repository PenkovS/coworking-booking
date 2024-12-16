<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p class="login-cta">
        Already have an account? <router-link to="/login">Login here</router-link>.
      </p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      async registerUser() {
        try {
          await axios.post("/api/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          alert("Registration successful!");
          this.$router.push("/login");
        } catch (error) {
          console.error("Error registering:", error);
          alert("Registration failed. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .login-cta {
    margin-top: 15px;
  }
  </style>
  