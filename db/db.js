const logger = require('tracer').colorConsole({ level: 'warn' });
const getDbConfig = require('./config');

const pool = getDbConfig();

pool.on('error', (err, client) => { // eslint-disable-line no-unused-vars
  logger.error(err.stack);
});


module.exports = pool;
