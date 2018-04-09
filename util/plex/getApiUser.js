const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
module.exports = (user) => {
  const p = new Promise((resolve, reject) => {
    const settings = user.settings.plex;
    if (!settings.url) reject('Plex is not configured');
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
    opts.options.identifier = '6ce0a124-842d-4e5c-a5bd-908e7de9082e';
    opts.options.product = 'MediaButler Music Player';
    opts.options.version = user.client.mbVersion;
    opts.options.deviceName = 'Discord';
    opts.authenticator = plexPinAuth;
    const d = new plexApi(opts);
    resolve(d);
  });
  return p;
};