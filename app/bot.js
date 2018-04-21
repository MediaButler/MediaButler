const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.mbVersion = '0.6';
client.debug = true;
const token = require('./config/bot.json').discordToken;
console.log("\n"
    + "███╗   ███╗███████╗██████╗ ██╗ █████╗ ██████╗ ██╗   ██╗████████╗██╗     ███████╗██████╗\n"
    + "████╗ ████║██╔════╝██╔══██╗██║██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██║     ██╔════╝██╔══██╗\n"
    + "██╔████╔██║█████╗  ██║  ██║██║███████║██████╔╝██║   ██║   ██║   ██║     █████╗  ██████╔╝\n"
    + "██║╚██╔╝██║██╔══╝  ██║  ██║██║██╔══██║██╔══██╗██║   ██║   ██║   ██║     ██╔══╝  ██╔══██╗\n"
    + "██║ ╚═╝ ██║███████╗██████╔╝██║██║  ██║██████╔╝╚██████╔╝   ██║   ███████╗███████╗██║  ██║\n"
    + "╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝\n"
    + `Version ${client.mbVersion}\n\n`
    + "Starting...");

// Load commands
client.guildCommands = new Discord.Collection();
client.directCommands = new Discord.Collection();
client.guildCommandAlias = new Discord.Collection();
client.directCommandAlias = new Discord.Collection();

fs.readdir('./commands/guild/', (err, files) => {
    if (err) console.error(err);
    console.log(`Loading Guild Commands... (Total: ${files.length})`);
    files.forEach(f => {
        const props = require(`./commands/guild/${f}`);
        if (props.onLoad) props.onLoad();
        client.guildCommands.set(props.conf.name, props);
        props.conf.alias.forEach(alias => {
            client.guildCommandAlias.set(alias, props.conf.name);
        });
        console.log(`Loaded command ${props.conf.name}`)
    });
});

fs.readdir('./commands/direct/', (err, files) => {
    if (err) console.error(err);
    console.log(`Loading Direct Message Commands... (Total: ${files.length})`);
    files.forEach(f => {
        const props = require(`./commands/direct/${f}`);
        if (props.onLoad) props.onLoad();
        client.directCommands.set(props.conf.name, props);
        props.conf.alias.forEach(alias => {
            client.directCommandAlias.set(alias, props.conf.name);
        });
        console.log(`Loaded DM command ${props.conf.name}`);
    });
});

// Load database

// Load Events
require('./service/events/loader')(client);
client.login(token)