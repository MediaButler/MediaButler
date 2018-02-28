const getApi = require('./getApi');
module.exports = (guild, imdbId) => {
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild)
      .then((radarr) => {
        radarr.get('movie/lookup', { 'term': `imdb:${imdbId}` })
          .then((result) => {
            if (result.length === 0) reject('No results found');
            resolve(result[0]);
          }).catch((err) => { reject(err); });
      }).catch((e) => { reject(e); });
  });
  return p;
};