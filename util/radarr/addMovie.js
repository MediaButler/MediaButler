const getApi = require('./getApi');
const SonarrAPI = require('sonarr-api');
module.exports = (guild, movie, profileId = null, rootPath = null) => {
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild)
      .then((radarr) =>
      {
        const data = {
          'tmdbId': movie.tmdbId,
          'title': movie.title,
          'qualityProfileId': profileId,
          'titleSlug': movie.titleSlug,
          'images': movie.images,
          'monitored': true,
          'rootFolderPath': rootPath,
          'year': movie.year
        };
        radarr.post('movie', data)
          .then((result) => {
            if (result.title == undefined || result.title == null) reject('Could not add');
            resolve(result);
          }).catch((e) => { reject(e); });
      }).catch((e) => { reject(e); });
  });
  return p;
};