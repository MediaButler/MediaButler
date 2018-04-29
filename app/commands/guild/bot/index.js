const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    run: (client, message, args = [], perms) => {
        let command = args[0];
        if (!command) command = 'help';
        if (client.botCommands.has(command)) {
            client.debugMsg(`Running ${module.exports.conf.name} subcommand ${command}`);
            args.splice(0, 1);
            client.botCommands.get(command).run(client, message, args, perms);
        } else message.channel.send(`Error: Unknown command "${command}"`);
    },
    conf: {
        name: 'bot',
        alias: [],
        description: 'Actions focused around controlling the bot (like prefix)'
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
        delete client.botCommands;
    }
}