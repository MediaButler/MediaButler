const getSettings = require('./getTautulliSettings');
const request = require('request');
module.exports = (guildId, username) => 
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        const url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_users`;
        request(url, function(e, r, b) {
          const j = JSON.parse(b);
          const u = j.response.data.find(o => o.username === username);
          if (u === undefined) reject('Unable to match user');
          resolve(u.user_id);
        });
      }).catch((e) => { reject(e); });
  });
  return p;
};