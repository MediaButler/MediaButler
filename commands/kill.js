const getPlexClient = require('../util/plex/getPlexClient');

exports.run = (bot, msg, args, perms) => {
    msg.channel.send("Starting...")
    .then((m) => {
        getPlexClient(msg.guild.id)
        .catch((err) => {
            console.log(err);
            console.log(typoeof(err));
            if (err === "updTokenSuccessful") m.edit("Sucessfully processed plex token. Please run command again and we will work.");
            if (typeof(err) === 'object') m.edit(`Please go to https://plex.tv/pin and authenticate this code: ${err.code}`);
        })
        .then((plexClient) => {
            m.edit("We have a fully authenticated plex token. Thats the end of the command");
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
    description: 'Kills stream playing from Plex. Gives optional reason',
    usage: 'kill <streamId> [reason]'
};
