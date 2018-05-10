module.exports = class messageService {
    constructor(client, repository, logService, languageService, settingsService) {
        this.client = client;
        this.commandRepository = repository;
        this.logService = logService;
        this.languageService = languageService;
        this.settingsService = settingsService;
    }

    async handle(message, oldMessage = null) {
        if (message.author.bot) return;
        this.logService.debug(`Received Message from ${message.author.username}@${message.guild.name}: ${message.content}`);
        if (!message.guild.settings) message.guild.settings = await this.settingsService.get(message.guild.id);
        if (message.content.startsWith(message.guild.settings.prefix[0])) {
            const firstWord = message.content.split(' ')[0].slice(message.guild.settings.prefix.length);
            const t = await this.languageService.resolveGroup(message.guild.settings.lang, firstWord);
            if (t) {
                let secondWord = message.content.split(' ')[1];
                if (!secondWord) return message.channel.send(this.languageService.get(message.guild.settings.lang, 'bot.notEnoughArguments'));
                const t2 = await this.languageService.resolveCommand(message.guild.settings.lang, t, secondWord);
                if (t2) {
                    let args = message.content.split(' ');
                    args.shift();
                    args.shift();
                    return this._runCommand(message, t, t2, args);
                }
            }

            const a = await this.languageService.resolveAlias(message.guild.settings.lang, firstWord);
            if (a) {
                const group = a.split('.')[0];
                const cmd = a.split('.')[1];
                let args = message.content.split(' ');
                args.shift();
                return this._runCommand(message, group, cmd, args);
            }
        }
    }

    async _runCommand(message, group, cmd, args) {
        const g = await this.commandRepository.getGroup(group);
        if (!g) throw new Error('Group does not exist');
        const c = await g.commands.get(cmd);
        if (!c) throw new Error('Command does not exist');
        const r = new c(this.client);
        console.log(args);
        return r.run(message, args);
    }
}