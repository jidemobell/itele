const { queryHelper } = require('../../libs/queryHelper');
const { userInfo } = require('../const/info');
const { topActiveUsers } = require('../const/active');

module.exports = {

  /**
   * select top active users
   * @param  {number} val pagination limit
   * @return {Object[]} array of user objects
   */
  listUsersByActivity(val) {
    const query = {
      text: topActiveUsers,
      values: [val],
    };
    return queryHelper(query).then(response => response)
      .catch((e) => { throw e; });
  },
  /**
   * get user information
   * @param  {number} id
   */
  getUser(id) {
    const query = {
      text: userInfo,
      values: [id],
    };
    return queryHelper(query).then(response => response)
      .catch((e) => { throw e; });
  },
};
