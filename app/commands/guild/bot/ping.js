module.exports = {
    run: (client, message, args, perms) => {
        message.channel.send(message.guild.languageService.get('bot.ping.ping'))
            .then(msg => {
                msg.edit(message.guild.languageService.get('bot.ping.reply', msg.createdTimestamp - message.createdTimestamp));
            });
    },
    conf: {
        name: 'bot.ping.name',
        alias: 'bot.ping.alias',
        description: 'bot.ping.description'
    }
}