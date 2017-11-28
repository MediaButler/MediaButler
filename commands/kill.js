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
            let reason = "Bot%20Test%20Sorry....%20Continue";
            if (!args[0]) {
                m.edit("ERR: No stream id to kill provided.");
                return;
            }
            if (args[1]) {
                // Remove first arg out of it and create reason.
                args.splice(0, 1);
                reason = args.join("%20");
                console.log(reason);
            }
            getStreams(plexClient)
            .then((res) => { 
                res.MediaContainer.Video.forEach((v) => {
                    if (v.sessionKey == streamId) {
                        m.edit(`Killing stream ${v.Session.id}`);
                        killStream(plexClient, v.Session.id, reason).then(() => { m.edit("Sucessfully sent request to kill stream"); });
                    }
                });
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