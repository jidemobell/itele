const fs = require('fs');
const path = require('path');
const logger = require('tracer').colorConsole();

module.exports = {
  /**
   * This function loads the app with the
   * latest database structure. existing
   * are not repeated.
   * @param  {} pool
   */
  loadDb(pool) {
    fs.readFile(path.join(__dirname, 'db.sql'), 'utf-8', (err, data) => {
      if (err) {
        logger.error('Error reading init sql file:', err.stack);
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
  },
};
