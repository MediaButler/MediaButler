const request = require('request');
module.exports = (guild, mock = false) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.tautulli;
    if (!settings.url) reject('Tautulii not configured');
    if (!settings.apikey) reject('Tautulli not configured');
    let url = `${settings.url}/api/v2?apikey=${settings.apikey}&cmd=get_activity`;
    if (mock) url = 'http://5a25f098e70f7b001228cec6.mockapi.io/plexpy_nowplaying';
    request(url, function(e, r, b) {
      const j = JSON.parse(b);
      if (e && r.statusCode !== 200) reject(e);
      resolve(j.response);
    });
  });
  return p;
};