const getApi = require('./getApi');
module.exports = (guild, user, results = null) => 
{
  const p = new Promise((resolve, reject) => 
  {
    if (results == null) results = 3;            
    const params = {
      'user': user,
      'length': results
    };
    getApi(guild, 'get_history', params)
      .then((res) => {
        resolve(res.data.response);
      }).catch(reject);
  });
  return p;
};