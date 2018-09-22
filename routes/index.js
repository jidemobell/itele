const express = require('express');
const { query, validationResult } = require('express-validator/check');

const routes = express.Router();

const { getTopUsers, getUser } = require('../db/controller/users');
const { listingsHelper } = require('../helpers/helpers');


const checkPageId = [
  query('page').isInt(),
];

routes.get('/topActiveUsers', checkPageId, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const order = req.query.page;
  getTopUsers(order).then((doc) => {
    doc.map(user => listingsHelper(user));
    res.status(200).json(doc);
  }).catch(err => res.status(400).send(err.stack));
});

const checkUserId = [
  query('id').isInt(),
];

routes.get('/users', checkUserId, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const id = req.query.id;
  getUser(id).then((doc) => {
    res.status(200).json(doc);
  }).catch(err => res.status(400).send(err.stack));
});

module.exports = routes;
