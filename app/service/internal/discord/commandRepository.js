const Discord = require('discord.js');

module.exports = class commandRegistry {
    constructor(client) {
        this.client = client;
        this.groups = new Discord.Collection();
        this.commands = new Discord.Collection();
    }

    registerCommand(command)
}