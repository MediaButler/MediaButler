const getApi = require('./getApi');
module.exports = (guild) =>
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.plex;
    getApi(guild)
      .then((d) => {
        if (settings.pinToken != null) reject('Pin token already exists');
        plexPinAuth.getNewPin()
          .then((pinObj) => { 
            guild.settings.pinToken = pinObj;
            resolve(pinObj);           
          });
      });
  });
  return p;
};