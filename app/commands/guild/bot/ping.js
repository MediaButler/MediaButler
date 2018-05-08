const l = require('../../../config.json').defaultLanguage;
const lang = require('../../../lang')(l);

module.exports = {
    run: (client, message, args, perms) => {
        message.channel.send(lang.get('bot.ping.ping'))
            .then(msg => {
                msg.edit(lang.get('bot.ping.reply', msg.createdTimestamp - message.createdTimestamp));
            });
    },
    conf: {
        name: lang.get('bot.ping.name'),
        alias: [lang.get('bot.ping.alias')],
        description: lang.get('bot.ping.description')
    }
}