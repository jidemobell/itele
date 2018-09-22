const { queryHelper } = require('../../helpers/helpers');
const { userInfo } = require('../const/info');
const { topActiveUsers } = require('../const/active');

/**
 * list top active users for the week
 * with latest applied listings.
 * @function
 * @name getTopUsers
 * @param {number} page - A page number.
 * @returns {object[]} Returns an array of top users for the week.
 */

const getTopUsers = (page) => {
  const query = {
    text: topActiveUsers,
    values: [page],
  };
  return queryHelper(query).then(response => response)
    .catch((e) => { throw e; });
};

/**
 * Get a user information from the
 * user id
 * @function
 * @name getUser
 * @param {number} id - A user id.
 * @returns {object} Returns a user object.
 */

const getUser = (id) => {
  const query = {
    text: userInfo,
    values: [id],
  };
  return queryHelper(query).then(response => response)
    .catch((e) => { throw e; });
};

module.exports = {
  getTopUsers,
  getUser,
};
