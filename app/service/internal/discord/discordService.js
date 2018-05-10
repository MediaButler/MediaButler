const Discord = require('discord.js');
const logService = require('../../logService');
const languageService = require('../../languageService');
const messageHandler = require('../discord/messageHandler');
const settingsService = require('../../settingsService');
const commandRepository = require('./commandRepository');

module.exports = class discordService extends Discord.Client {
    constructor(config = {}) {
        super(config);
        this.mbVersion = '0.6-DEV';
        this.settingsService = new settingsService();
        this.logService = new logService(0);
        this.languageService = new languageService(this.logService);
        this.commandRepository = new commandRepository(this)
        this.messageHandler = new messageHandler(this, this.commandRepository, this.logService, this.languageService, this.settingsService);

        const msgErr = (err) => { this.emit('error', err); };
        this.on('message', (message) => { 
            this.messageHandler.handle(message).catch(msgErr);
        });
        this.on('messageUpdate', (oldMessage, message) => {
            this.messageHandler.handle(message, oldMessage).catch(msgErr);
        });
        this.on('debug', (msg) => this.logService.debug(msg));
        this.on('error', (msg) => this.logService.error(msg));
        this.on('warn', (msg) => this.logService.warn(msg));

        this.on('guildCreate', (client, guild) => {
            guild.settings = this.settingsService.get(guild.id);
            if (!guild.settings) {
                guild.settings = require('../internal/defaultGuild.json');
                guild.settings.uuid = uuid();
                this.settingsService.set(guild.id, guild.settings);
                this.logService.info(`Joined Guild ${guild.name}`);
            }
        });
        this.on('guildDelete', (client, guild) => {
            this.settingsService.delete(guild.id);
            this.logService.info(`Left Guild ${guild.name}`);
        });

        this.once('ready', () => {
            // Roll through each guild load in settings, make them accessible
            this.user.setPresence({game: {name: `MediaButler v${this.mbVersion}`, type: 0}});
        });
    }
}