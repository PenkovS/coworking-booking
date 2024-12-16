import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"; // Изменено с Home.vue
import UserLogin from "../views/UserLogin.vue"; // Изменено с Login.vue
import UserRegister from "../views/UserRegister.vue"; // Изменено с Register.vue
import BookingForm from "../components/BookingForm.vue";
import UserDashboard from "../components/UserDashboard.vue";

const routes = [
  { path: "/", name: "HomeView", component: HomeView }, // Изменено имя компонента
  { path: "/login", name: "UserLogin", component: UserLogin }, // Изменено имя компонента
  { path: "/register", name: "UserRegister", component: UserRegister }, // Изменено имя компонента
  { path: "/booking", name: "BookingForm", component: BookingForm },
  { path: "/dashboard", name: "UserDashboard", component: UserDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
