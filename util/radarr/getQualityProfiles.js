const getApi = require('./getRadarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guild) => {
  const p = new Promise((resolve, reject) =>
  {
    getApi(guild)
      .then((radarr) =>
      {
        radarr.get('profile')
          .then((result) => {
            resolve(result);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};