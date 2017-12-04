const getSettings = require('./getSonarrSettings');
const SonarrAPI = require('sonarr-api');
module.exports = (guildId, tvShow, profileId = null, rootPath = null) => {
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) =>
      {
        if (profileId === null) profileId = settings.profileId;
        if (rootPath === null) rootPath = settings.rootPath;
        const sonarr = new SonarrAPI({ hostname: settings.host, apiKey: settings.apikey, port: settings.port, urlBase: `/${settings.path}` });
        const data = {
          'tvdbId': tvShow.tvdbId,
          'title': tvShow.title,
          'qualityProfileId': profileId,
          'titleSlug': tvShow.titleSlug,
          'images': tvShow.images,
          'seasons': tvShow.seasons,
          'monitored': true,
          'seasonFolder': true,
          'rootFolderPath': rootPath
        };
        sonarr.post('series', data)
          .then((result) => {
            if (result.title == undefined || result.title == null) reject('Could not add');
            resolve(result);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};