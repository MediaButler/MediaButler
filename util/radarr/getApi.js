const SonarrAPI = require('sonarr-api');
module.exports = (guild) => {
  const p = new Promise((resolve, reject) => {
    const settings = guild.settings.radarr;
    if (!settings.url) reject('Radarr not configured');
    if (!settings.apikey) reject('Radarr not configured');
    if (!settings.defaultProfile) reject('Radarr not configured');
    if (!settings.defaultRootPath) reject('Radarr is not configured');
    const regex = /(?:([A-Za-z]+):)?(?:\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?/g;
    const details = regex.exec(settings.url);     
    let useSsl = false;
    if (details[1] == 'https') useSsl = true;
    let port = 443;
    if (details[1] == 'http') port = 80;
    if (details[3] !== undefined) port = details[3];
    const radarr = new SonarrAPI({ hostname: details[2], apiKey: settings.apikey, port: port, urlBase: `${details[4]}`, ssl: useSsl });
    resolve(radarr);
  });
  return p;
};