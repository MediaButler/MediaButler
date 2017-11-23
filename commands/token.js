const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
const getSettings = require('../util/getPlexSettings');
var sqlite3 = require('sqlite3').verbose();

exports.run = (bot, msg, args, perms = []) => {
    let d;
    getSettings(msg.guild.id)
    .then((settings) => {
        d = new PlexAPI({
            identifier: '1f02119d-2819-4667-8902-2c962b2298d0',
            product: 'MediaButler',
            version: '0.2',
            deviceName: 'MediaButlerOS',
            platform: 'Node.js',            
            hostname: settings.host,
            authenticator: plexPinAuth,
            token: null
        });
        if (settings.token !== null) d.token = settings.token;

        if (d.token == null) {
            if (!settings.pintoken) {
                // Setup plex pin for user
                plexPinAuth.getNewPin()
                .then((pinObj) => { 
                    let db = new sqlite3.Database('./settings.sqlite');    
                    let query = `UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = ?`
                    let queryData = [JSON.stringify(pinObj), guildId, "plex.pintoken"];
                    db.run(query, queryData, function(err) {
                        if (err) {
                            message.channel.send("Unable to update: " + err.message);
                          return;
                        }
                        msg.channel.send(`Please go to https://plex.tv/pin and authenticate this code: ${pinObj.code}`);
                    });    
                    db.close();                
                });
                return;
            }

            // Verify pin and get token
            plexPinAuth.checkPinForAuth(pinObj, function callback(err, status) {
                if(err) {
                    msg.channel.send(`Unable to authenticate token due to ${status}`);
                } else {
                    console.log(status);
                    console.log(d);
                    let db = new sqlite3.Database('./settings.sqlite');    
                    let query = `UPDATE guildSettings SET "value" = ? WHERE "guildId" = ? AND "setting" = ?`
                    let queryData = [d.token, guildId, "plex.token"];
                    db.run(query, queryData, function(err) {
                        if (err) {
                            message.channel.send("Unable to update: " + err.message);
                          return;
                        }
                    });    
                    db.close();    
                }
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
    description: "Handles Plex tokens",
    usage: "token"
  };