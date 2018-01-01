const getApi = require('./getApi');
module.exports = (guild, userId) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const params = {
      'user_id': userId
    };
    getApi(guild, 'get_user_watch_time_stats', params)
      .then((res) => {
        resolve(res.data.response);
      }).catch(reject);
  });
  return p;
};