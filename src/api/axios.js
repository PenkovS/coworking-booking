import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Укажите URL вашего бэкенда
  withCredentials: true, // Для отправки cookie, если используется сессия
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавление токена в заголовки Authorization (если используется JWT)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
