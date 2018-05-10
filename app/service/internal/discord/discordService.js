const Discord = require('discord.js');
const logService = require('../../logService');
const languageService = require('../../languageService');
const messageHandler = require('../discord/messageHandler');
const settingsService = require('../../settingsService');

module.exports = class discordService extends Discord.Client {
    constructor(config = {}) {
        super(config);
        this.mbVersion = '0.6';
        this.settingsService = new settingsService();
        this.logService = new logService(0);
        this.languageService = new languageService(this.logService);
        this.messageHandler = new messageHandler(this, this.logService, this.languageService);

        const msgErr = err => { this.emit('error', err); };
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
            // Create settings for guild
        });
        this.on('guildDelete', (client, guild) => {
            // Remove all settings for guild
        });

        this.once('ready', () => {
            // Roll through each guild load in settings, make them accessible
        });
    }
}