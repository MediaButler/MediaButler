const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
const getSettings = require('./getPlexSettings');
const getPin = require('./getPin');
const getAuthToken = require('./getAuthToken');
module.exports = (guildId) =>
{
  const p = new Promise((resolve, reject) => 
  {
    getSettings(guildId)
      .then((settings) => {
        if (settings.token == null || settings.token == '') {
          if (settings.pinToken == null || settings.pinToken == '') getPin(guildId).then((pinobj) => { reject(pinobj); return; });
          else getAuthToken(guildId).then(() => { reject('updTokenSuccessful'); return; });
        }
        else {
          const opts = {};
          opts.options = {};
          opts.hostname = settings.host;
          opts.https = false;
          if (settings.protocol == 'https') opts.https = true;
          opts.token = settings.token;
          opts.options.identifier = settings.uuid;
          opts.options.product = 'MediaButler';
          opts.options.version = '0.3';
          opts.options.deviceName = 'MediaButlerBot';
          opts.authenticator = plexPinAuth;
          d = new plexApi(opts);
          console.log(d);
          resolve(d);
        }
      }).catch((err) => { console.log(err); });
  });
  return p;
};