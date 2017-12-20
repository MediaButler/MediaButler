const getApi = require('./getApi');
module.exports = (guild, tvdbId) => {
  const p = new Promise((resolve, reject) => 
  {
    getApi(guild)
      .then((sonarr) => {
        console.log('gotapi');
        sonarr.get('series/lookup', { 'term': `tvdb: ${tvdbId}` })
          .then((result) => {
            if (result.length === 0) reject('No results found');
            console.log(result);
            resolve(result[0]);
          }).catch((err) => { reject(err); });
      }).catch((err) => { reject(err); });
  });
  return p;
};