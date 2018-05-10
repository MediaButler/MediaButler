const command = require('../base');

module.exports = class pingCommand extends command {
    constructor(client) {
        const info = {
            "name": "ping",
            "group": "bot",
            "type": "guild"
        }
        super(client, info);
    }

    run(message, args = []) {
        message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.ping.ping'))
        .then(msg => {
            msg.edit(this.client.languageService.get(message.guild.settings.lang, 'bot.ping.reply', msg.createdTimestamp - message.createdTimestamp));
        });
    }
}