const TVDB = require('node-tvdb');
module.exports = (guild, imdbId) => {
  const tvdb = new TVDB(guild.settings.thetvdb.apikey);  
  const p = new Promise((resolve, reject) => {
    try {
      tvdb.getSeriesByImdbId(imdbId)
        .then(response => { resolve(response[0].id); })
        .catch(error => { reject(error); });
    }
    catch (e) {
      reject(e);
    }
  });
  return p;
};