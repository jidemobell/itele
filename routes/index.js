const express = require('express');


const routes = express.Router();

const { listUsersByActivity } = require('../db/models/users');

routes.get('/topActiveUsers', (req, res) => {
  const order = req.query.page;

  listUsersByActivity(order).then((doc) => {
    res.status(200).send(doc);
  }).catch(err => res.status(400).send(err.stack));
});

module.exports = routes;
