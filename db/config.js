const envConfig = require('dotenv');
const logger = require('tracer').colorConsole();

const env = process.env.NODE_ENV;

if (env !== 'production') {
  envConfig.config();
}

const { Pool } = require('pg');

const config = {
  test: {
    user: process.env.PG_USER,
    database: process.env.PG_TEST,
    password: process.env.PG_KEY,
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    idleTimeoutMillis: 30000,
  },
  development: {
    user: process.env.PG_USER,
    database: process.env.PG_DBASE,
    password: process.env.PG_KEY,
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    idleTimeoutMillis: 30000,
  },
  production: {
    user: process.env.PG_USER,
    database: process.env.PG_PROD_DBASE,
    password: process.env.PG_KEY,
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    idleTimeoutMillis: 30000,
  },
};

const getDbEnvConfig = () => {
  if (!config[env].user) {
    logger.error('Database Connection: environment variables error, user not set in environment');
    process.exit();
  }

  if (!config[env].database) {
    logger.error('Database Connection: environment variables error, database not set in environment');
    process.exit();
  }

  if (!config[env].password) {
    logger.error('Database Connection: environment variables error, database key not set in environment');
    process.exit();
  }


  switch (env) {
    case 'test':
      return new Pool(config.test);
    case 'development':
      return new Pool(config.development);
    case 'production':
      return new Pool(config.production);
    default:
  }
};

module.exports = getDbEnvConfig;
