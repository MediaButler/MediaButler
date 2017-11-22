const getSettings = require('./getSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId, tvdbId) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            settings = JSON.parse(settings);
            let host = settings.find(x => x.setting == "sonarr.host").value;
            let baseurl = settings.find(x => x.setting == "sonarr.baseurl").value;
            let apikey = settings.find(x => x.setting == "sonarr.apikey").value;
            const sonarr = new SonarrAPI({ hostname: host.split(":")[0], apiKey: apikey, port: host.split(":")[1], urlBase: baseurl });
            sonarr.get("series/lookup", { "term": `tvdb: ${tvdbId}` })
            .then((result) => {
                if (result.length === 0) reject("No results found");
                resolve(result[0]);
            });
        }).catch((e) => { reject(e); });
    });
    return p;
};