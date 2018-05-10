const command = require('../base');

module.exports = class prefixCommand extends command {
    constructor(client) {
        const info = {
            "name": "prefix",
            "group": "bot",
            "type": "guild"
        }
        super(client, info);
    }

    run(message, args = []) {
        args = args.toString();
        if (args == '') return message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.prefix.noPrefix'));
        message.guild.settings = this.client.settingsService.get(message.guild.id);
        message.guild.settings.prefix = args;
        this.client.settingsService.set(message.guild.id, message.guild.settings);
        message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.prefix.changePrefix', args));

    }

}