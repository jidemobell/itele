require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/db');
const routes = require('./routes/index');

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.listen(port, () => {
  console.log(`application started on port ${port}`);
});

module.exports = app;
