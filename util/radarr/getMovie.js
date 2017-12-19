const getApi = require('./getApi');
const SonarrAPI = require('sonarr-api');
module.exports = (guild, imdbId) => {
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild)
      .then((radarr) =>
      {
        radarr.get('movies/lookup', { 'term': `imdb:${imdbId}` })
          .then((result) => {
            if (result.length === 0) reject('No results found');
            resolve(result[0]);
          });
      }).catch((e) => { reject(e); });
  });
  return p;
};