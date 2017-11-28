const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
const getSettings = require('../util/getPlexSettings');
const escapeString = require('../util/escapeString');
var sqlite3 = require('sqlite3').verbose();
module.exports = (guildId) =>
{
    const p = new Promise((resolve, reject) => 
    {
        let d;
        getSettings(msg.guild.id)
        .then((settings) => {
            let opts = {};
            opts.options = {};
            opts.hostname = settings.host;
            opts.https = true;
            opts.authToken = null;
            opts.options.identifier = settings.uuid;
            opts.options.product = 'MediaButler';
            opts.options.version = '0.2';
            opts.options.deviceName = 'MediaButlerBot';
            opts.authenticator = plexPinAuth;
            d = new plexApi(opts);
            if (settings.pinToken != null) reject("Pin token already exists");
            plexPinAuth.getNewPin()
            .then((pinObj) => { 
                let db = new sqlite3.Database('./settings.sqlite');    
                let jsonObj = JSON.stringify(pinObj);
                let query = `UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = "plex.pintoken"`;
                db.run(query, [escapeString(jsonObj), msg.guild.id], function(err) {
                    if (err) {
                        reject(`Unable to update: ${err.message}`);
                    }
                    resolve(pinObj);
                });    
                db.close();                
            });
        });
    });
};