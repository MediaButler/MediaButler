const axios = require('axios');
module.exports = (guild, command, args) => {
  const p = new Promise((resolve, reject) => {
    // generate the base url
    if (!guild.settings.tautulli.url) reject('Tautulli URL not set');
    if (!guild.settings.tautulli.apikey) reject('Tautulli Apikey not set');
    let params = '&';
    if (typeof(args) == 'object') {
      for (let key of Object.keys(args)) {
        params += `${key}=${args[key]}&`;
      }
    }
    resolve(axios({
      method: 'GET',
      url: `${guild.settings.tautulli.url}/api/v2?apikey=${guild.settings.tautulli.apikey}&cmd=${command}${params}`
    })).catch(() => {
      reject(Error('Could not reach Tautulli.'));
    });
  });
  return p;
};