const getSettings = require('./getSonarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId) => {
  const p = new Promise((resolve, reject) =>
  {
    getSettings(guildId)
      .then((settings) =>
      {
        const sonarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
        sonarr.get('profile')
          .then((result) => {
            resolve(result);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};