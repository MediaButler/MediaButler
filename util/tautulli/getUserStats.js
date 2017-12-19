const request = require('request');
module.exports = (guild, userId) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.tautulli;
    if (!settings.url) reject('Tautulii not configured');
    if (!settings.apikey) reject('Tautulli not configured');
    const url = `${settings.url}/api/v2?apikey=${settings.apikey}&cmd=get_user_watch_time_stats&user_id=${userId}`;
    request(url, function(e, r, b) {
      const j = JSON.parse(b);
      if (e && r.statusCode !== 200) reject(e);
      resolve(j.response);
    });
  });
  return p;
};