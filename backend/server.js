const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Пример: Маршрут для получения списка коворкингов
const coworkings = [
  { id: 1, name: 'Коворкинг 1', address: 'Адрес 1' },
  { id: 2, name: 'Коворкинг 2', address: 'Адрес 2' },
];

app.get('/api/coworkings', (req, res) => {
  res.json(coworkings);
});

app.post('/api/book/:id', (req, res) => {
  const id = req.params.id;
  // Проверка бронирования
  res.json({ message: `Коворкинг ${id} успешно забронирован!` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
