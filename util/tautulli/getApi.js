const axios = require('axios');
module.exports = (guild, command, args = []) => {
  const p = new Promise((resolve, reject) => {
    // generate the base url
    if (!guild.settings.tautulli.url) reject('Tautulli URL not set');
    if (!guild.settings.tautulli.apikey) reject('Tautulli Apikey not set');
    resolve(axios({
      method: 'GET',
      url: `${guild.settings.tautulli.url}/api/v2?apikey=${guild.settings.tautulli.apikey}&cmd=${command}`
    })).catch(() => {
      reject(Error('Could not reach Tautulli.'));
    });
  });
  return p;
};