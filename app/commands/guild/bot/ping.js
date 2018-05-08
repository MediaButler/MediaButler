const lang = require('../../../lang/en');

module.exports = {
    run: (client, message, args, perms) => {
        message.channel.send(lang.bot.ping.ping)
            .then(msg => {
                msg.edit(lang.format(lang.bot.ping.reply, msg.createdTimestamp - message.createdTimestamp));
            });
    },
    conf: {
        name: lang.bot.ping.name,
        alias: [lang.bot.ping.alias],
        description: lang.bot.ping.description
    }
}