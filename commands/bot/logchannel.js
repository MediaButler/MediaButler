const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
    if (!args[0]) {
        msg.channel.send('ERR: No channel specified.');
        return;
    }
    if (args[0].startsWith("<#")) {
        args[0] = args[0].slice(2, -1);
        args[0] = msg.guild.channels.find('id', args[0]).name;
    }
    msg.guild.settings.logchannel = args[0];
    saveDb(bot);
    msg.channel.send(`Updated logchannel to ${args[0]}`);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};
exports.help = {
    name: 'logchannel',
    description: 'Sets channel for bot to log to',
    usage: 'bot logchannel'
};