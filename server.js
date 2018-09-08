require('dotenv').config();
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/db');
const routes = require('./routes/index');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  const port = process.env.PORT || 4000;
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/body', routes);
  app.listen(port);

  module.exports = app;
}
