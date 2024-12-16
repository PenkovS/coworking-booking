<template>
    <div>
      <h2>Админ-панель</h2>
      <table>
        <tr>
          <th>Название</th>
          <th>Адрес</th>
          <th>Управление</th>
        </tr>
        <tr v-for="coworking in coworkings" :key="coworking.id">
          <td>{{ coworking.name }}</td>
          <td>{{ coworking.address }}</td>
          <td>
            <button @click="deleteCoworking(coworking.id)">Удалить</button>
          </td>
        </tr>
      </table>
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
        fetch('/api/coworkings')
          .then(response => response.json())
          .then(data => {
            this.coworkings = data;
          });
      },
      deleteCoworking(id) {
        fetch(`/api/coworkings/${id}`, { method: 'DELETE' })
          .then(response => response.json())
          .then(() => {
            this.fetchCoworkings();
          });
      },
    },
  };
  </script>
  