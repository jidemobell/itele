const pool = require('../db/db');

/**
 * This functions is used with the controller
 * functions to connect to a db client and avoid DRY
 * on code
 * @function
 * @name queryHelper
 * @param {string} query - A query text.
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
