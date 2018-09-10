const express = require('express');

const routes = express.Router();

const { listUsersByActivity } = require('../db/controller/users');

routes.get('/topActiveUsers', (req, res) => {
  const order = req.query.page;

  listUsersByActivity(order).then((doc) => {
    res.status(200).json(doc);
  }).catch(err => res.status(400).send(err.stack));
});

module.exports = routes;
