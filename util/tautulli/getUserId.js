const request = require('request');
module.exports = (guild, username) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.tautulli;
    if (!settings.url) reject('Tautulii not configured');
    if (!settings.apikey) reject('Tautulli not configured');
    const url = `${settings.url}/api/v2?apikey=${settings.apikey}&cmd=get_users`;
    request(url, function(e, r, b) {
      const j = JSON.parse(b);
      const u = j.response.data.find(o => o.username === username);
      if (u === undefined) reject('Unable to match user');
      resolve(u.user_id);
    });
  });
  return p;
};