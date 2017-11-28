const getPlexClient = require('../util/plex/getPlexClient');
const killStream = require('../util/plex/killStream');
const getStreams = require('../util/plex/getStreams');
const plexApi = require('plex-api');

exports.run = (bot, msg, args = [], perms) => {
    msg.channel.send("Starting...")
    .then((m) => {
        getPlexClient(msg.guild.id)
        .then((plexClient) => {
            let streamId = args[0];
            let reason = "Killed%20by%20Server%20Administrator";
            if (!args[0]) {
                m.edit("ERR: No stream id to kill provided.");
                return;
            }
            if (args[1]) {
                // Remove first arg out of it and create reason.
            }

            getStreams(plexClient)
            .then((res) => { 
                res.MediaContainer.Video.forEach((v) => {
                    console.log(`${v.sessionKey} - ${v.Session.id}`); 
                });
            });

            killStream(plexClient, streamId, reason)
            .then(() => { 
                m.edit("Sucessfully sent request to kill stream");
            }).catch((err) => {
                m.edit("ERR: Unable to send request to PleX");
                return;
            });
        }).catch((err) => {
            console.log(err);
            if (err == "updTokenSuccessful") m.edit("Sucessfully processed plex token. Please run command again and we will work.");
            if (typeof(err) == "object") m.edit(`Please go to https://plex.tv/pin and authenticate this code: ${err.code}`);
        });
    });
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};
exports.help = {
    name: 'kill',
    description: 'Kills stream playing from Plex. Gives optional reason\nREQUIRES PLEX PASS',
    usage: 'kill <streamId> [reason]'
};