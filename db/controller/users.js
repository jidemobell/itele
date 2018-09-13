const { queryHelper } = require('../../libs/queryHelper');
const { userInfo } = require('../const/info');
const { topActiveUsers } = require('../const/active');

/**
  * select top active users
  * @param  {number} val page
  * @return {Object[]} array of user objects
  */
const getTopUsers = (val) => {
  const query = {
    text: topActiveUsers,
    values: [val],
  };
  return queryHelper(query).then(response => response)
    .catch((e) => { throw e; });
};

/**
  * get user information
  * @param  {number} id
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
