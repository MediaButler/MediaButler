const getSettings = require('./getSonarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId, tvdbId) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            const sonarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
            sonarr.get("series/lookup", { "term": `tvdb: ${tvdbId}` })
            .then((result) => {
                if (result.length === 0) reject("No results found");
                resolve(result[0]);
            });
        }).catch((e) => { reject(e); });
    });
    return p;
};