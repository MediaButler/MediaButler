const request = require('request');
module.exports = (guild, user, results = null) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.tautulli;
    if (!settings.url) reject('Tautulii not configured');
    if (!settings.apikey) reject('Tautulli not configured');
    if (results == null) results = 3;        
    const url = `${settings.url}/api/v2?apikey=${settings.apikey}&cmd=get_history&length=${results}&user=${user}`;
    request(url, function(e, r, b) {
      const j = JSON.parse(b);
      if (e && r.statusCode !== 200) reject(e);
      resolve(j.response);
    });
  });
  return p;
};