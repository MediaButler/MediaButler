const uuid = require('uuid-v4');

module.exports = (message) => {
    const client = message.client;
    let command;
    let args;
    let perms;

    if (message.author.bot) return;

    switch (message.channel.type) {
        case 'dm':
        case 'group':
            client.debugMsg(`Direct message received from ${message.author.username}: ${message.content}`);
            break;

        case 'voice':
            break;

        default:
            client.debugMsg(`Message received from ${message.author.username}@${message.guild.name}: ${message.content}`);
            let settings = client.guildSettings.get(message.guild.id);
            if (!settings) {
                settings = require('../internal/defaultGuild.json');
                settings.uuid = uuid();
                client.guildSettings.set(message.guild.id, settings);
            }
            message.guild.settings = settings
            if (!message.guild.languageService) message.guild.languageService = new client.services.language(settings.lang);
            if (message.content.startsWith(settings.prefix)) {
                command = message.content.split(' ')[0].slice(settings.prefix.length);
                args = message.content.split(' ').slice(1);
                let action;
                if (client.guildCommandAlias.has(command)) action = client.guildCommandAlias.get(command);
                if (client.guildCommands.has(command)) action = client.guildCommands.get(command);
                if (action) {
                    client.debugMsg(`Running command ${client.languageService.get(action.conf.name)}`);
                    action.run(client, message, args, perms);
                }
            }
            break;
    }
}