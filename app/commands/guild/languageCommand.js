const command = require('../base');

module.exports = class languageCommand extends command {
    constructor(client) {
        const info = {
            "name": "language",
            "group": "bot",
            "type": "guild"
        }
        super(client, info);
    }

    async run(message, args) {
        if (args == '') return message.say(this.client.languageService.get(message.guild.settings.lang, 'bot.language.failedArgs'));
        if (args == message.guild.settings.lang) return message.say(this.client.languageService.get(message.guild.settings.lang, 'bot.language.failedSame'));
        const languages = this.client.languageService.getLanguages();
        if (languages.indexOf(args) == -1) return message.say(this.client.languageService.get(message.guild.settings.lang, 'bot.language.failedNotFound'));

        message.guild.settings = this.client.settingsService.get(message.guild.id);
        message.guild.settings.lang = args;
        this.client.settingsService.set(message.guild.id, message.guild.settings);

        return message.say(this.client.languageService.get(message.guild.settings.lang, 'bot.language.success'));
    }
}