<template>
    <div>
      <h2>Карта коворкингов</h2>
      <div v-for="coworking in coworkings" :key="coworking.id">
        <h3>{{ coworking.name }}</h3>
        <p>{{ coworking.address }}</p>
        <button @click="book(coworking.id)">Забронировать</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        coworkings: [],
      };
    },
    created() {
      this.fetchCoworkings();
    },
    methods: {
      fetchCoworkings() {
        // Получение списка коворкингов с бекенда
        fetch('/api/coworkings')
          .then(response => response.json())
          .then(data => {
            this.coworkings = data;
          });
      },
      book(id) {
        // Отправка запроса на бронирование
        fetch(`/api/book/${id}`, { method: 'POST' })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
          });
      },
    },
  };
  </script>
  