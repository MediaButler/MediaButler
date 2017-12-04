const request = require('request');
const getSettings = require('./getPlexPySettings');
module.exports = (guildId, user, results = null) => 
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {       
        if (results == null) results = 3;        
        const url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_history&length=${results}&user=${user}`;
        request(url, function(e, r, b) {
          const j = JSON.parse(b);
          if (e && r.statusCode !== 200) reject(e);
          resolve(j.response);
        });
      }).catch((e) => { reject(e); });
  });
  return p;
};