const request = require('request');
const getSettings = require('./getPlexPySettings');
module.exports = (guildId, mock = false) => 
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        let url = `${settings.protocol}://${settings.host}/${settings.path}/api/v2?apikey=${settings.apikey}&cmd=get_activity`;
        if (mock) url = 'http://5a25f098e70f7b001228cec6.mockapi.io/plexpy_nowplaying';
        request(url, function(e, r, b) {
          const j = JSON.parse(b);
          if (e && r.statusCode !== 200) reject(e);
          resolve(j.response);
        });
      }).catch((e) => { reject(e); });
  });
  return p;
};