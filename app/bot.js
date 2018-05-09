const Discord = require('discord.js');
const Enmap = require('enmap');
const EnmapSQLite = require('enmap-sqlite');
const guildSettingsProvider = new EnmapSQLite({ name: 'guildSettings' });
const client = new Discord.Client();
const fs = require('fs');
client.mbVersion = '0.6';
client.debug = require('./config.json').debug;
client.started = false;
client.guildSettings = new Enmap({ provider: guildSettingsProvider });
const token = require('./config.json').discordToken;
const formatDate = require('./service/internal/formatDate');

const services = {};
services.language = require('./service/language');

// Logging functions
client.debugMsg = (msg) => {
    if (!client.debug) return;
    console.log(`${formatDate(new Date(), 'd M Y H:i:s')} | DEBUG | ${msg}`);
}
client.infoMsg = (msg) => {
    console.log(`${formatDate(new Date(), 'd M Y H:i:s')} | INFO | ${msg}`);
}
client.warnMsg = (msg) => {
    console.warn(`${formatDate(new Date(), 'd M Y H:i:s')} | WARN | ${msg}`);
}
client.errorMsg = (msg) => {
    console.error(`${formatDate(new Date(), 'd M Y H:i:s')} | ERROR | ${msg}`);
}

console.log("\n"
    + "███╗   ███╗███████╗██████╗ ██╗ █████╗ ██████╗ ██╗   ██╗████████╗██╗     ███████╗██████╗  \n"
    + "████╗ ████║██╔════╝██╔══██╗██║██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██║     ██╔════╝██╔══██╗ \n"
    + "██╔████╔██║█████╗  ██║  ██║██║███████║██████╔╝██║   ██║   ██║   ██║     █████╗  ██████╔╝ \n"
    + "██║╚██╔╝██║██╔══╝  ██║  ██║██║██╔══██║██╔══██╗██║   ██║   ██║   ██║     ██╔══╝  ██╔══██╗ \n"
    + "██║ ╚═╝ ██║███████╗██████╔╝██║██║  ██║██████╔╝╚██████╔╝   ██║   ███████╗███████╗██║  ██║ \n"
    + "╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝ \n"
    + `Version ${client.mbVersion}\n`
    + "Starting...\n\n");

// Load commands
client.guildCommands = new Discord.Collection();
client.directCommands = new Discord.Collection();
client.guildCommandAlias = new Discord.Collection();
client.directCommandAlias = new Discord.Collection();

// Set global language
client.languageService = new services.language('en');

fs.readdir('./commands/guild/', (err, files) => {
    if (err) client.errorMsg(err);
    client.infoMsg(`Loading Guild Commands... (Total: ${files.length})`);
    files.forEach(f => {
        const props = require(`./commands/guild/${f}`);
        if (props.onLoad) props.onLoad();
        client.guildCommands.set(client.languageService.get(props.conf.name), props);
        if (props.start) props.start(client, client.languageService);
        if (props.conf.alias) {
            const t = client.languageService.get(props.conf.alias.toString());
            client.guildCommandAlias.set(t, props);
        }
        client.infoMsg(`Loaded command ${client.languageService.get(props.conf.name)}`)
    });
});

fs.readdir('./commands/direct/', (err, files) => {
    if (err) client.errorMsg(err);
    client.infoMsg(`Loading Direct Message Commands... (Total: ${files.length})`);
    files.forEach(f => {
        const props = require(`./commands/direct/${f}`);
        if (props.onLoad) props.onLoad();
        client.directCommands.set(client.languageService.get(props.conf.name), props);
        if (props.conf.alias) {
            const t = client.languageService.get(props.conf.alias.toString());
            client.guildCommandAlias.set(t, props);
        }
        client.infoMsg(`Loaded DM command ${client.languageService.get(props.conf.name)}`);
    });
});

// Load Events
require('./service/events/loader')(client);
client.login(token)