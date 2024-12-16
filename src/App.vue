<template>
  <div id="app">
    <header class="main-header">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard" v-if="isAuthenticated">Dashboard</router-link>
        <router-link to="/login" v-else>Login</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};
</script>

<style scoped>
.main-header {
  background: #007bff;
  color: white;
  padding: 15px;
}
nav {
  display: flex;
  gap: 15px;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
