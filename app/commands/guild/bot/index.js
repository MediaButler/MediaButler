const Discord = require('discord.js');
const fs = require('fs');
const _languageService = require('../../../service/language');

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
        name: 'bot.name',
        alias: 'bot.alias',
        description: 'bot.description'
    },
    start: (client) => {
        if (!client.languageService) client.languageService = new _languageService('en');
        client.botCommands = new Discord.Collection();
        fs.readdir(`./commands/guild/${client.languageService.get(module.exports.conf.name)}/`, (err, files) => {
            files.forEach((f) => {
                if (f != 'index.js') {
                    const props = require(`./${f}`);
                    client.botCommands.set(client.languageService.get(props.conf.name), props);
                    if (props.conf.alias) {
                        const t = client.languageService.get(props.conf.alias.toString());
                        client.guildCommandAlias.set(t, props);
                    }
                    client.infoMsg(`Loaded ${client.languageService.get(module.exports.conf.name)} sub-command ${client.languageService.get(props.conf.name)}`)
                }
            });
        });
    },
    stop: (client) => {
        delete client.botCommands;
    }
}