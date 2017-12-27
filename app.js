const Discord = require('discord.js');
const client = new Discord.Client();
client.mbVersion = '0.4';
const settings = require('./settings.json');
const fs = require('fs');
const moment = require('moment');
const webserver = require('./web/server');
require('./util/eventLoader')(client);

const log = (message) => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}.`);
    if (props.start) props.start(client);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = (message) => {
  let permlvl = 0;
  if (message.member.hasPermission('MANAGE_MESSAGES')) permlvl = 2;
  if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3;
  if (message.author.id == message.guild.ownerID) permlvl = 4;
  return permlvl;
};

client.login(settings.token);
process.env.WEBPACK_PORT = 2486;
process.env.BASE_URL = 'http://localhost:2486/';
process.env.NODE_ENV = 'development';
client.webapp = webserver();
