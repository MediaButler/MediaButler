const getApi = require('./getApi');
module.exports = (guild, username) => 
{
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild, 'get_users', {})
      .then((res) => {
        const u = res.data.response.data.find(o => o.username === username);
        if (u === undefined) reject('Unable to match user');
        resolve(u.user_id);
      }).catch(reject);
  });
  return p;
};