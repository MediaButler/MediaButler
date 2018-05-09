const fs = require('fs');
const process = require('process');
module.exports = {
    run: (client, message, args, perms) => {
        if (!args) return message.channel.send(message.guild.languageService.get('bot.language.failedArgs'));
        if (message.guild.languageService.get('code') == args) return message.channel.send(message.guild.languageService.get('bot.language.failedSame'));
        if (!fs.existsSync(`${process.cwd()}/lang/${args}.js`)) return message.channel.send(message.guild.languageService.get('bot.language.failedNotFound'));
        message.guild.languageService = new client.services.language(args);
        const settings = client.guildSettings.get(message.guild.id);
        settings.lang = args;
        client.guildSettings.set(message.guild.id, settings);
        message.channel.send(message.guild.languageService.get('bot.language.success'));
    },
    conf: {
        name: 'bot.language.name',
        alias: 'bot.language.alias',
        description: 'bot.language.description'
    }
}