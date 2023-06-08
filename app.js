const express = require('express');
const app = express();
require('@babel/register');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const { Game, Stand } = require('./db/models');

//TG BOT
const TelegramApi = require('node-telegram-bot-api');

const token = '5881271352:AAGqhR_sSOJ_D79RTXCcsQ-O6nkvfL4af0A';

const bot = new TelegramApi(token, { polling: true });

const start = async () => {
  bot.setMyCommands([{ command: '/start', description: 'Список стендов' }]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === '/start') {
        const response = await Stand.findAll();
        const stands = response.map((el) => el.get({ plain: true }));

        console.log('Айпи школьника', chatId);

        const standList = {
          list: {
            reply_markup: JSON.stringify({
              inline_keyboard: stands.map((el) => [
                {
                  text: `${el.id}, адрес: ${el.address}`,
                  callback_data: `${el.id}`,
                },
              ]),
            }),
          },
        };
        return bot.sendMessage(chatId, `СПИСОК СТЕНДОВ`, standList.list);
      }
      return bot.sendMessage(chatId, 'Неверная команда :с');
    } catch (e) {
      return bot.sendMessage(chatId, 'Ошибка');
    }
  });

  bot.on('callback_query', async (msg) => {
    const standId = msg.data;
    const chatId = msg.message.chat.id;
    try {
      const response = await Game.findAll({ where: { standId } });
      const games = response.map((el) => el.get({ plain: true }));

      return bot.sendMessage(
        chatId,
        games
          .map(
            (el) =>
              `Номер игры: ${el.id}, Игра: ${el.name}, Длительность ${
                el.duration
              } сек, Стоимость: ${el.price} р, Очки: ${
                el.score
              }, Дата: ${el.createdAt.toLocaleString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}`
          )
          .join('\n\n')
      );
    } catch (error) {
      console.log(error);
    }
  });
};

start();

//импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');

// импорт роутов
const huippyRoutes = require('./routes/huippyRoutes');
const e = require('express');

// вызов функции проверки соединения с базоый данных
dbCheck();

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//роутеры
app.use('/', huippyRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});
