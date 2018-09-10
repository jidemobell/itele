const fs = require('fs');
const path = require('path');
const logger = require('tracer').colorConsole({ level: 'warn' });
const getDbConfig = require('./config');

const pool = getDbConfig();

pool.on('error', (err, client) => { // eslint-disable-line no-unused-vars
  logger.error(err.stack);
});

fs.readFile(path.join(__dirname, 'init.sql'), 'utf-8', (err, data) => {
  if (err) {
    logger.error('Error reading sql file:', err.stack);
  }

  pool.connect()
    .then((client) => {
      return client.query(data)
        .then(() => {
          client.release();
        });
    })
    .catch((error) => {
      logger.error(error);
      process.exit();
    });
});

module.exports = pool;
