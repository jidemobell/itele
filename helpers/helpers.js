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

const listingsHelper = (data) => {
  const keysArray = Object.keys(data);
  for (let i = 0; i < keysArray.length; i += 1) {
    if (keysArray[i] === 'listings') {
      data.listings = data.listings.slice(0, 3);
    }
  }
  return data;
};


module.exports = {
  queryHelper,
  listingsHelper,
};
