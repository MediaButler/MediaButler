const getSettings = require('./getRadarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId) => {
  const p = new Promise((resolve, reject) =>
  {
    getSettings(guildId)
      .then((settings) =>
      {
        const radarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
        radarr.get('profile')
          .then((result) => {
            resolve(result);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};