const getApi = require('./getApi');
module.exports = (guild) =>
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.plex;
    getApi(guild)
      .then((d) => {
        if (settings.pinToken != null) reject('Pin token already exists');
        d.authenticator.getNewPin()
          .then((pinObj) => { 
            guild.settings.plex.pinToken = pinObj;
            resolve(pinObj);           
          });
      });
  });
  return p;
};