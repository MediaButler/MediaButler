const getApi = require('./getApi');
const getProfileId = require('./getQualityProfileId');
module.exports = (guild, tvShow, profileId = null, rootPath = null) => {
  const p = new Promise((resolve, reject) => 
  {

    if (!profileId) getProfileId(guild.settings.sonarr.defaultProfile)
      .then((res) => {
        profileId = res;
      });

    getApi(guild)
      .then((sonarr) => {
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