const _languageService = require('../../../service/language');
module.exports = {
    run: (client, message, args, perms) => {
        const languageService = new _languageService(message.guild.settings.lang);
        message.channel.send(languageService.get('bot.ping.ping'))
            .then(msg => {
                msg.edit(languageService.get('bot.ping.reply', msg.createdTimestamp - message.createdTimestamp));
            });
    },
    conf: {
        name: 'bot.ping.name',
        alias: 'bot.ping.alias',
        description: 'bot.ping.description'
    }
}