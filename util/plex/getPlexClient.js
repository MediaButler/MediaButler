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
            if (settings.token == null || settings.token == "") {
                if (settings.pinToken == null || settings.pinToken == "") getPin(guildId).then((pinobj) => { console.log(pinobj); throw JSON.stringify(pinobj); return; });
                else getAuthToken(guildId).then(() => { throw "updTokenSuccessful"; return; });
            }
            let opts = {};
            opts.options = {};
            opts.hostname = settings.host;
            opts.https = true;
            opts.authToken = settings.token;
            opts.options.identifier = settings.uuid;
            opts.options.product = 'MediaButler';
            opts.options.version = '0.2';
            opts.options.deviceName = 'MediaButlerBot';
            opts.authenticator = plexPinAuth;
            d = new plexApi(opts);
            resolve(d);
        });
    });
    return p;
}