const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
module.exports = (guild) => {
  const p = new Promise((resolve, reject) => {
    const settings = guild.settings.plex;
    if (!settings.url) reject('Plex is not configured');
    if (!guild.settings.uuidv4) {
      const uuid = require('uuid-v4');
      const saveDb = require('../db/saveDb');
      guild.settings.uuidv4 = uuid();
      saveDb(guild.client);
    }

    const regex = /^(http[s]?):\/?\/?([^:\/\s]+):?([0-9]{5})?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)?$/g;
    const details = regex.exec(settings.url);
    let port = 443;
    if (details[1] == 'http') port = 80;
    if (details[3] !== undefined) port = details[3];

    const opts = {};
    opts.options = {};
    opts.hostname = details[2];
    opts.port = port;
    opts.https = false;
    if (details[1] == 'https') opts.https = true;
    if (settings.token) opts.token = settings.token;
    opts.options.identifier = guild.settings.uuidv4;
    opts.options.product = 'MediaButler';
    opts.options.version = '0.4';
    opts.options.deviceName = 'MediaButlerBot';
    opts.authenticator = plexPinAuth;
    const d = new plexApi(opts);
    resolve(d);
  });
  return p;
};