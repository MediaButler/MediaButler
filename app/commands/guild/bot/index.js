const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    run: (client, message, args, perms) => {
        message.channel.send('Ping?')
            .then(msg => {
                msg.edit(`I'm still working! (It took me ${msg.createdTimestamp - message.createdTimestamp}ms to respond)`);
            });
    },
    conf: {
        name: 'bot',
        alias: []
    },
    start: (client) => {
        client.botCommands = new Discord.Collection();
        fs.readdir(`./commands/guild/${module.exports.conf.name}/`, (err, files) => {
            files.forEach((f) => {
                if (f != 'index.js') {
                    const props = require(`./${f}`);
                    client.botCommands.set(props.conf.name, props);
                    props.conf.alias.forEach(alias => {
                        client.guildCommandAlias.set(alias, props);
                    });
                    client.infoMsg(`Loaded ${module.exports.conf.name} sub-command ${props.conf.name}`)
                }
            });
        });
    },
    stop: (client) => {

    }
}