const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
const getSettings = require('../util/plex/getPlexSettings');
const escapeString = require('../util/escapeString');
var sqlite3 = require('sqlite3').verbose();

exports.run = (bot, msg, args, perms = []) => {
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
        if (settings.token != null) d.authToken = settings.token;
        if (d.authToken == null) {
            if (!settings.pinToken || settings.pinToken === null) {
                plexPinAuth.getNewPin()
                .then((pinObj) => { 
                    let db = new sqlite3.Database('./settings.sqlite');    
                    let jsonObj = JSON.stringify(pinObj);
                    let query = `UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = "plex.pintoken"`;
                    db.run(query, [escapeString(jsonObj), msg.guild.id], function(err) {
                        if (err) {
                            msg.channel.send("Unable to update: " + err.message);
                          return;
                        }
                        msg.channel.send(`Please go to https://plex.tv/pin and authenticate this code: ${pinObj.code}`);
                    });    
                    db.close();                
                });
                return;
            }

            plexPinAuth.checkPinForAuth(settings.pinToken.id, function callback(err, status) {
                if(err) {
                    console.log(err);
                    msg.channel.send(`Unable to authenticate token due to ${err}`);
                    return;
                }
                let db = new sqlite3.Database('./settings.sqlite');    
                let query = `UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = ?`
                let queryData = [d.authenticator.token, msg.guild.id, "plex.token"];
                db.run(query, queryData, function(e) {
                    if (e) {
                        msg.channel.send("Unable to update: " + e.message);
                        return;
                    }
                    msg.channel.send("Sucessfully received authentication token");                    
                });
                db.close();
            });
        }
    });
}

exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [],
    permLevel: 4  
  };
  exports.help = {
    name: "token",
    description: "Handles Plex tokens. Not a real command.",
    usage: "token"
  };