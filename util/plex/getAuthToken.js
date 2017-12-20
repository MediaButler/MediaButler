const getApi = require('./getApi');
module.exports = (guild) =>
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = guild.settings.plex;
    getApi(guild)
      .then((d) => {
        if (settings.token != '' && settings.token != null) reject('Pin token already exists');
        d.authenticator.checkPinForAuth(settings.pinToken, function callback(err, status) {
          if (err) {
            console.log(err);
            reject(`Unable to authenticate token due to ${err}`);
          }
          console.log(status);
          console.log(d);
          settings.pinToken = null;
          settings.token = d.authenticator.token;
          resolve(d.authenticator.token);
        });
      });
  });
  return p;
};