require('dotenv').config();

const env = process.env.NODE_ENV;
const { Pool } = require('pg');

const config = {
  test: {
    user: process.env.PG_USER,
    database: 'ITELE_TEST_DBASE',
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
    database: 'ITELE_PROD_DBASE',
    password: process.env.PG_KEY,
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    idleTimeoutMillis: 30000,
  },
};

const getDbEnvConfig = () => {
  if (!config[env].user) {
    console.error('database connected details has not been set in .env');
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
