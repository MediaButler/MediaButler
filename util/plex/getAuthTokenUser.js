const getApiUser = require('./getApiUser');
module.exports = (user) =>
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = user.settings.plex;
    getApiUser(user)
      .then((d) => {
        if (settings.token != '' && settings.token != null) reject('Pin token already exists');
        d.authenticator.checkPinForAuth(settings.pinToken, function callback(err, status) {
          if (err) {
            reject(`Unable to authenticate token due to ${err}`);
          }
          settings.pinToken = null;
          settings.token = d.authenticator.token;
          resolve(d.authenticator.token);
        });
      });
  });
  return p;
};