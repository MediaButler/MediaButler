const getSettings = require('./getPlexPySettings');
const request = require('request');
module.exports = (guildId, userId) => 
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        const url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_user_watch_time_stats&user_id=${userId}`;
        request(url, function(e, r, b) {
          const j = JSON.parse(b);
          if (e && r.statusCode !== 200) reject(e);
          resolve(j.response);
        });
      }).catch((e) => { reject(e); });
  });
  return p;
};