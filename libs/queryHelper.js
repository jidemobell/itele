const pool = require('../db/db');

/**
 * @param  {string} query query text
 */
const queryHelper = (query) => {
  return new Promise((resolve, reject) => {
    return pool.query(query)
      .then(res => resolve(res.rows))
      .catch(e => reject(e));
  });
};


module.exports = {
  queryHelper,
};
