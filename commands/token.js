const plexApi = require('plex-api');
const plexPinAuth = require('plex-api-pinauth')();
const getSettings = require('../util/getPlexSettings');
var sqlite3 = require('sqlite3').verbose();

exports.run = (bot, msg, args, perms = []) => {
    let d;
    getSettings(msg.guild.id)
    .then((settings) => {
        d = new plexApi({
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
        console.log("checked settings");
        if (d.authToken == null) {
            console.log("no token");
            if (!settings.pinToken || settings.pinToken === null) {
                console.log("no pin token");
                // Setup plex pin for user
                plexPinAuth.getNewPin()
                .then((pinObj) => { 
                    console.log(pinObj);
                    let db = new sqlite3.Database('./settings.sqlite');    
                    console.log("set db");
                    let query = `UPDATE guildSettings SET "value" = "${pinObj}" WHERE "guildId" = "${msg.guild.id}" AND "setting" = "plex.pintoken"`;
                    console.log("set query");
                    console.log("going to save");
                    db.run(query, function(err) {
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
            console.log(settings.pinToken);

            // Verify pin and get token
            plexPinAuth.checkPinForAuth(settings.pinToken, function callback(err, status) {
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