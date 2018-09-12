const logger = require('tracer').colorConsole();
const getDbConfig = require('./config');

const { loadDb } = require('./initializer/loadScript');

const pool = getDbConfig();

pool.on('error', (err, client) => { // eslint-disable-line no-unused-vars
  logger.error(err.stack);
});

loadDb(pool);

module.exports = pool;
