module.exports = {
    run: (client, message, args, perms) => {
        let err;
        if (args.length == 0) err = message.guild.languageService.get('bot.prefix.noPrefix');

        if (err) {
            message.channel.send(`Error: ${err}`);
            return;
        }
        const settings = client.guildSettings.get(message.guild.id);
        settings.prefix = args;
        client.guildSettings.set(message.guild.id, settings);
        message.channel.send(message.guild.languageService.get('bot.prefix.changePrefix',args));
    },
    conf: {
        name: 'bot.prefix.name',
        alias: false,
        description: 'bot.prefix.description'
    }
}