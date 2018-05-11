const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');

module.exports = class commandRepository {
    constructor(client) {
        this.client = client;
        this.groups = new Enmap();
        this.commands = new Enmap();
        this.loadCommands('commands/guild');
    }

    getGroups() {
        return this.groups.keyArray()
    }

    getCommands() {
        return this.commands.keyArray();
    }

    async getGroup(name) {
        return await this.groups.get(name);
    }

    addGroup(name) {
        const t = {
            'name': name,
            'commands': new Enmap(),
        }
        this.groups.set(name, t);
    }

    addCommand(command) {
        const cmd = new command(this.client);

        if (!this.groups.some(x => x.name == cmd.info.group)) { 
            this.addGroup(cmd.info.group);
        }

        const g = this.groups.get(cmd.info.group);
        if (g.commands.some(x => x.name === cmd.info.name)) {
            throw new Error(`Command "${cmd.info.name}" already exists`);
        }
        g.commands.set(cmd.info.name, command);
        this.groups.set(cmd.info.group, g);
        this.client.logService.info(`Loaded command: ${cmd.info.group}.${cmd.info.name}`);
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