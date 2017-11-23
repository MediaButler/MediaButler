const getSettings = require('./getRadarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId, imdbId) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            const radarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
            radarr.get("movies/lookup", { "term": `imdb:${imdbId}` })
            .then((result) => {
                if (result.length === 0) reject("No results found");
                resolve(result[0]);
            });
        }).catch((e) => { reject(e); });
    });
    return p;
};