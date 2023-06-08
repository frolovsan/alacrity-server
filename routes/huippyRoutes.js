const express = require('express');
const route = express.Router();
const { Game, Stand } = require('../db/models');

route.get('/stands', async (req, res) => {
  try {
    const response = await Stand.findAll();
    const stands = response.map((el) => el.get({ plain: true }));

    if (response) {
      res.json(stands);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
  }
});

route.get('/games', async (req, res) => {
  try {
    console.log('v ruchke');
    const response = await Game.findAll();
    const games = response.map((el) => el.get({ plain: true }));

    console.log(games);

    if (response) {
      res.json(games);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
  }
});

route.post('/stands', async (req, res) => {
  try {
    const { stand } = req.body;
    const response = await Stand.create(stand);

    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
  }
});

route.post('/games', async (req, res) => {
  try {
    const { game } = req.body;
    const response = await Game.create(game);

    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
