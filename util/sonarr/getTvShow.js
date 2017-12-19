const getApi = require('./getApi');
module.exports = (guild, tvdbId) => {
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild)
      .then((sonarr) => {
        sonarr.get('series/lookup', { 'term': `tvdb: ${tvdbId}` })
          .then((result) => {
            if (result.length === 0) reject('No results found');
            resolve(result[0]);
          });
      }).catch((err) => { reject(err); });
  });
  return p;
};