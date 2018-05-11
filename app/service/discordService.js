const Discord = require('discord.js');
const fs = require('fs');
const uuid = require('uuid');
const logService = require('./logService');
const languageService = require('./languageService');
const messageService = require('./messageService');
const settingsService = require('./settingsService');
const commandRepository = require('./commandRepository');

module.exports = class discordService extends Discord.Client {
    constructor(config = {}) {
        super(config);
        this.mbVersion = '1.0';
        this.isDocker = false;
        if (fs.existsSync('/config/')) {
            this.isDocker = true;
        }

        this.settingsService = new settingsService(this);
        this.logService = new logService(config.consoleLog);
        this.languageService = new languageService(this.logService);
        this.commandRepository = new commandRepository(this)
        this.messageService = new messageService(this, this.commandRepository, this.logService, this.languageService, this.settingsService);

        const msgErr = (err) => { this.emit('error', err); };
        this.on('message', (message) => { 
            this.messageService.handle(message).catch(msgErr);
        });
        this.on('messageUpdate', (oldMessage, message) => {
            this.messageService.handle(message, oldMessage).catch(msgErr);
        });
        this.on('debug', (msg) => this.logService.debug(msg));
        this.on('error', (msg) => this.logService.error(msg));
        this.on('warn', (msg) => this.logService.warn(msg));

        this.on('guildCreate', (client, guild) => {
            guild.settings = this.settingsService.get(guild.id);
            if (!guild.settings) {
                guild.settings = this.settingsService.create(guild.id);
                this.logService.info(`Joined Guild ${guild.name}`);
            }
        });
        this.on('guildDelete', (client, guild) => {
            this.settingsService.delete(guild.id);
            this.logService.info(`Left Guild ${guild.name}`);
        });

        this.once('ready', () => {
            this.user.setPresence({game: {name: `MediaButler v${this.mbVersion}`, type: 0}});
            this.guilds.forEach((guild) => {
                guild.settings = this.settingsService.get(guild.id);
                if (!guild.settings) {
                    guild.settings = this.settingsService.create(guild.id);
                    this.logService.info(`Created guildSettings: ${guild.name}`);
                }
            });
        });
    }
}