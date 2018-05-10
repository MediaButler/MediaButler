module.exports = class messageHandler {
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
            const cmdText = this.getCommand(message);
            this.languageService.resolve(message.guild.settings.lang, cmdText.name)
                .then((res) => {
                    if (res !== 'undefined.undefined') {
                        this.logService.debug(`Attempting to run ${res} with arguments: ${cmdText.args}`);
                        let run = this.commandRepository.getCommand(res);
                        run = new run(this.client);
                        run.run(message, cmdText.args);
                    }
                });
        }
    }

    getCommand(message) {
        return {
            name: this._getCommandTrigger(message, message.guild.settings.prefix.length),
            args: this._getCommandArguments(message)
        }
    }

    _getCommandTrigger(message, sLength) {
        const args = message.content.split(' ');
        const cmd = args[0].slice(sLength);
        return cmd;
    }

    _getCommandArguments(message) {
        return message.content.split(' ').slice(1);
    }
}