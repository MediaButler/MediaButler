const getSettings = require('../util/getPlexSettings');

exports.run = (client, message, args, perms) => {
    message.channel.send("Hello, World!");
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'kill',
    description: 'Kills stream playing from Plex. Gives optional reason',
    usage: 'kill <streamId> [reason]'
};
