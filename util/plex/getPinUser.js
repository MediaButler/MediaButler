const getApiUser = require('./getApiUser');
module.exports = (user) =>
{
  const p = new Promise((resolve, reject) => 
  {
    const settings = user.settings.plex;
    getApiUser(user)
      .then((d) => {
        if (settings.pinToken != null) reject('Pin token already exists');
        d.authenticator.getNewPin()
          .then((pinObj) => { 
            user.settings.plex.pinToken = pinObj;
            resolve(pinObj);           
          });
      });
  });
  return p;
};