const getApi = require('./getApi');
module.exports = (guild) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const params = {
      'time_range': '30',
      'stats_type': 1,
      'stats_count': '6'
    };
    getApi(guild, 'get_home_stats', params)
      .then((res) => {
        resolve(res.data.response.data);
      }).catch(reject);
  });
  return p;
};