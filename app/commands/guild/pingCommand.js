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

    async run(message, args = []) {
        const msg = await message.say(this.client.languageService.get(message.guild.settings.lang, 'bot.ping.ping'));
        return msg.edit(this.client.languageService.get(message.guild.settings.lang, 'bot.ping.reply', msg.createdTimestamp - message.createdTimestamp));
    }
}