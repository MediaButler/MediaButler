const Enmap = require('enmap');
const commandService = require('./commandService');

module.exports = class messageService {
    constructor(client, repository, logService, languageService, settingsService) {
        this.client = client;
        this.commandRepository = repository;
        this.logService = logService;
        this.languageService = languageService;
        this.settingsService = settingsService;
        this._results = new Enmap();
        this._awaiting = new Set();
    }

    async handle(message, oldMessage = null) {
        if (!this.shouldHandleMessage(message, oldMessage)) return;
        this.logService.debug(`Received Message from ${message.author.username}@${message.guild.name}: ${message.content}`);
        if (!message.guild.settings) message.guild.settings = await this.settingsService.get(message.guild.id);
        if (message.content.startsWith(message.guild.settings.prefix[0])) {
            let msgCmd, msgCmdOld;
            msgCmd = await this.parseMessage(message);
            if (oldMessage) {
                msgCmdOld = await this._results.get(oldMessage.id);                
                if (msgCmd && msgCmdOld) {
                    msgCmd.response = msgCmdOld.response;
                    msgCmd.responsePositions = msgCmdOld.responsePositions;
                }
            }
            if (msgCmd) {
                let response;
                if (msgCmdOld) {
                    msgCmdOld.finalize(null);
                }
                response = await msgCmd.run();
                if (typeof response === 'undefined') response = null;
                msgCmd.finalize(response);
                this.saveCommandMessage(message, oldMessage, msgCmd, response);
            }
        }
    }

    shouldHandleMessage(message, oldMessage = null) {
        if (message.author.bot) return false;
        else if (message.author.id === this.client.user.id) return false;
        if (this._awaiting.has(message.author.id + message.channel.id)) return false;
        if (oldMessage && message.content === oldMessage.content) return false;
        return true;
    }

    saveCommandMessage(message, oldMessage, msgCmd, response) {
        if (response !== null) {
            this._results.set(message.id, msgCmd);
            if (!oldMessage) {
                setTimeout(() => { this._results.delete(message.id); }, 60 * 1000);
            }
        } else {
            this._results.delete(message.id);
        }
    }

    async parseMessage(message) {
        let command;
        let args;
        const fw = message.content.split(' ')[0].slice(message.guild.settings.prefix.length);
        const a = await this.languageService.resolveAlias(message.guild.settings.lang, fw);
        if (a && a !== 'undefined.undefined') {
            const [grp, cmd] = a.split('.');
            const g = await this.commandRepository.getGroup(grp);
            command = await g.commands.get(cmd);
            args = message.content.split(' ').shift();
            args = args.toString();
        }
        const t = await this.languageService.resolveGroup(message.guild.settings.lang, fw);
        if (t) {
            let sw = message.content.split(' ')[1];
            if (!sw) throw new Error('No command specified');
            const t2 = await this.languageService.resolveCommand(message.guild.settings.lang, t, sw);
            const g = await this.commandRepository.getGroup(t);
            command = g.commands.get(t2);
            args = message.content.split(' ');
            args.shift();
            args.shift();
            args = args.toString();
        }
        if (!command) return false;
        return new commandService(message, command, args);
    }
}