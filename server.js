const cluster = require('cluster');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('tracer').colorConsole();
const pool = require('./db/db'); // eslint-disable-line no-unused-vars
const usersRoutes = require('./routes/index');

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
  app.use('/', usersRoutes);
  app.listen(port, () => logger.info(`Server listening on port : ${port}`));
  module.exports = app;
}
