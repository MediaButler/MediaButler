const getSettings = require('./getSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (tvShow, profileId = null, rootPath = null) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            settings = JSON.parse(settings);
            let host = settings.find(x => x.setting == "sonarr.host").value;
            let baseurl = settings.find(x => x.setting == "sonarr.baseurl").value;
            let apikey = settings.find(x => x.setting == "sonarr.apikey").value;
            let defaultProfileId = settings.find(x => x.setting == "sonarr.defaultprofileid").value;
            let defaultRootPath = settings.find(x => x.setting == "sonarr.defaultrootpath").value;
            if (defaultProfileId === undefined) reject("defaultProfileId not set");
            if (defaultRootPath === undefined) reject("defaultRootPath not set");
            if (profileId === null) profileId = defaultProfileId;
            if (rootPath === null) rootPath = defaultRootPath;
            const sonarr = new SonarrAPI({ hostname: host.split(":")[0], apiKey: apikey, port: host.split(":")[1], urlBase: baseurl });
            let data = {
                "tvdbId": tvShow.tvdbId,
                "title": tvShow.title,
                "qualityProfileId": profileId,
                "titleSlug": tvShow.titleSlug,
                "images": tvShow.images,
                "seasons": tvShow.seasons,
                "monitored": true,
                "seasonFolder": true,
                "rootFolderPath": rootPath
            };
            sonarr.post("series", data)
            .then((result) => {
                if (result.title == undefined || result.title == null) reject("Could not add");
                resolve(result);
            });
        }).catch((e) => { reject(e); });
    });
    return p;
};