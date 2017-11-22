const getSettings = require('./getSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
            {
                settings = JSON.parse(settings);
                let host = settings.find(x => x.setting == "sonarr.host").value;
                let baseurl = settings.find(x => x.setting == "sonarr.baseurl").value;
                let apikey = settings.find(x => x.setting == "sonarr.apikey").value;
                let today = new Date();
                let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
                let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
                today.setUTCHours(20);
                tomorrow.setUTCHours(06);
                const sonarr = new SonarrAPI({ hostname: host.split(":")[0], apiKey: apikey, port: host.split(":")[1], urlBase: baseurl });
                sonarr.get("calendar", { "start": today.toISOString(), "end": tomorrow.toISOString()})
                .then((result) => {
                    resolve(result);
                });
            }
        ).catch((e) => { reject(e); });
    });
    return p;
};