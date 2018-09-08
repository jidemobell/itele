const fs = require('fs');
const path = require('path');
const getDbConfig = require('./config');

const pool = getDbConfig();


fs.readFile(path.join(__dirname, 'init.sql'), 'utf-8', (err, data) => {
  if (err) {
    console.error('error reading sql file', err);
  }

  pool.connect()
    .then((client) => {
      return client.query(data)
        .then(() => {
          client.release();
        });
    })
    .catch((error) => {
      console.error(error);
      process.exit();
    });
});

module.exports = pool;
