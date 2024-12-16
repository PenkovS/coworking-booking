const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose
  .connect('mongodb://localhost:27017/coworking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

// Модели данных
const Coworking = mongoose.model('Coworking', new mongoose.Schema({
  name: String,
  address: String,
  description: String,
}));

const Booking = mongoose.model('Booking', new mongoose.Schema({
  coworkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coworking' },
  date: Date,
  userName: String,
}));

// Маршрут для корневого URL
app.get('/', (req, res) => {
  res.send('Сервер работает! Используйте API, например: /api/coworkings');
});

// Пример маршрута для получения списка коворкингов
app.get('/api/coworkings', async (req, res) => {
  try {
    const coworkings = await Coworking.find();
    res.json(coworkings);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении списка коворкингов' });
  }
});

// Пример маршрута для добавления коворкинга
app.post('/api/coworkings', async (req, res) => {
  try {
    const { name, address, description } = req.body;
    const coworking = new Coworking({ name, address, description });
    await coworking.save();
    res.status(201).json(coworking);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении коворкинга' });
  }
});

// Пример маршрута для бронирования
app.post('/api/book/:id', async (req, res) => {
  try {
    const coworkingId = req.params.id;
    const { date, userName } = req.body;

    // Проверяем, существует ли бронирование на эту дату
    const existingBooking = await Booking.findOne({ coworkingId, date });
    if (existingBooking) {
      return res.status(400).json({ message: 'Коворкинг уже забронирован на эту дату!' });
    }

    // Создаем новое бронирование
    const booking = new Booking({ coworkingId, date, userName });
    await booking.save();
    res.status(201).json({ message: `Коворкинг успешно забронирован!`, booking });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при бронировании' });
  }
});

// Удаление бронирования (для админа)
app.delete('/api/book/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: 'Бронирование успешно удалено' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении бронирования' });
  }
});

// Запуск сервера
const PORT = 3000; // Порт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
