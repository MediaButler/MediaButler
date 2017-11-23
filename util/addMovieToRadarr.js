const getSettings = require('./getRadarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId, movie, profileId = null, rootPath = null) => {
    const p = new Promise((resolve, reject) => 
    {
        getSettings(guildId)
        .then((settings) =>
        {
            console.log("hello");
            if (profileId === null) profileId = settings.profileId;
            if (rootPath === null) rootPath = settings.rootPath;
            const radarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
            let data = {
                "tmdbId": movie.tmdbId,
                "title": movie.title,
                "qualityProfileId": profileId,
                "titleSlug": movie.titleSlug,
                "images": movie.images,
                "monitored": true,
                "rootFolderPath": rootPath
            };
            console.log("data made.. posting");
            radarr.post("movie", data)
            .then((result) => {
                console.log(result);
                if (result.title == undefined || result.title == null) reject("Could not add");
                resolve(result);
            }).catch((e) => { reject(e); });
        }).catch((e) => { reject(e); });
    });
    return p;
};