exports.run = (client, message, params, perms) => {
      message.channel.send("Hello, World!");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['set', 'settings', 'setconfig'],
    permLevel: 4
};

exports.help = {
    name: 'settings',
    description: 'Allows you to read/set a configuration.',
    usage: 'set <config> <value>'
};