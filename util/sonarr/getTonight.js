const getSettings = require('./getSonarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            let today = new Date();
            let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
            let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
            today.setUTCHours(20);
            tomorrow.setUTCHours(06);
            const sonarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
            sonarr.get("calendar", { "start": today.toISOString(), "end": tomorrow.toISOString()})
            .then((result) => {
                resolve(result);
            });
        }).catch((e) => { reject(e); });
    });
    return p;
};