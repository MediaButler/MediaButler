const command = require('../base');

module.exports = class languageCommand extends command {
    constructor(client) {
        const info = {
            "name": "bot.language",
            "alias": ["bot.language.alias"],
            "group": "bot",
            "description": "bot.language.description",
            "type": "guild"
        }
        super(client, info);
    }

    async run(message, args) {
        args = args.toString();
        if (args == '') return message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.language.failedArgs'));
        if (args == message.guild.settings.lang) return message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.language.failedSame'));
        const languages = this.client.languageService.getLanguages();
        if (languages.indexOf(args) == -1) return message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.language.failedNotFound'));

        message.guild.settings = this.client.settingsService.get(message.guild.id);
        message.guild.settings.lang = args;
        this.client.settingsService.set(message.guild.id, message.guild.settings);

        message.channel.send(this.client.languageService.get(message.guild.settings.lang, 'bot.language.success'));
    }
}