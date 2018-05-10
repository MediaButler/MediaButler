const Discord = require('discord.js');
const fs = require('fs');

module.exports = class commandRepository {
    constructor(client) {
        this.client = client;
        this.groups = new Discord.Collection();
        this.commands = new Discord.Collection();
        this.loadCommands('commands/guild');
    }

    allCommands() {
        return this.commands.keys();
    }

    addCommand(command) {
        const cmd = new command(this.client);

        if (this.commands.some(ccmd => ccmd.name === cmd.info.name)) {
            throw new Error(`Command "${cmd.info.name}" already exists`);
        }
        this.client.logService.info(`Loaded command: ${cmd.info.name}`);
        return this.commands.set(cmd.info.name, command);
    }

    getCommand(key) {
        return this.commands.get(key);
    }

    loadCommands(path) {
        fs.readdir(`${process.cwd()}/${path}`, (err, files) => {
            if (err) throw err;
            files.forEach(f => {
                const props = require(`${process.cwd()}/${path}/${f}`);
                this.client.logService.debug(`Attempting to load ${f}`);
                this.addCommand(props);
            });
        });
    }
}