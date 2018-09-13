const { queryHelper } = require('../../libs/queryHelper');
const { userInfo } = require('../const/info');
const { topActiveUsers } = require('../const/active');

/**
 * list top active users for the week with latest applied listings.
 * @function
 * @name getTopUsers
 * @memberof UserControllers
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
 * list top active users for the week with latest applied listings.
 * @function
 * @name getUser
 * @memberof UserControllers
 * @param {number} id - A page number.
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
