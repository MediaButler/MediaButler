const SonarrAPI = require('sonarr-api');
module.exports = (guild) => {
  const p = new Promise((resolve, reject) => {
    const settings = guild.settings.radarr;
    if (!settings.url) reject('Radarr not configured');
    if (!settings.apikey) reject('Radarr not configured');
    if (!settings.defaultProfile) reject('Radarr not configured');
    if (!settings.defaultRootPath) reject('Radarr is not configured');
    const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{4})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
    const details = regex.exec(settings.url);     
    let port = 443;
    if (details[1] == 'http') port = 80;
    if (details[3] !== undefined) port = details[3];
    const radarr = new SonarrAPI({ hostname: details[2], apiKey: settings.apikey, port: port, urlBase: `/${details[6]}` });
    resolve(radarr);
  });
  return p;
};