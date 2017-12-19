const getApi = require('./getApi');
const plexPinAuth = require('plex-api-pinauth')();
module.exports = (guild) =>
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.plex;
    getApi(guild)
      .then((d) => {
        if (settings.token != null) reject('Pin token already exists');
        plexPinAuth.checkPinForAuth(settings.pinToken.id, function callback(err, status) {
          if (err) {
            console.log(err);
            reject(`Unable to authenticate token due to ${err}`);
          }
          settings.token = d.authenticator.token;
          resolve();
        });
      });
  });
  return p;
};