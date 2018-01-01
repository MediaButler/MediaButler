const getApi = require('./getApi');
module.exports = (guild) => 
{
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild, 'get_activity', {})
      .then((res) => {
        resolve(res.data.response);
      }).catch(reject);
  });
  return p;
};