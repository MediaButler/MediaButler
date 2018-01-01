const fs = require('fs');
const Discord = require('discord.js');
exports.run = (bot, msg, args = [], perm) => {
  let command = args[0];
  if (command == undefined) command = 'help';
  let cmd;
  if (bot.statsCommands.has(command)) {
    cmd = bot.statsCommands.get(command);
    args.splice(0, 1);    
  } else {
    cmd = bot.statsCommands.get('help');
  }
  if (cmd) {
    if (perm < cmd.conf.permLevel) { msg.channel.send('Sorry. You do not have the required permissions to perform this action'); return; }
    cmd.run(bot, msg, args, perm);
  }
};
exports.help = {
  name: 'stats',
  description: 'Stats related commands',
  usage: 'stats'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.start = (bot) => {
  bot.statsCommands = new Discord.Collection();
  fs.readdir(`./commands/${this.help.name}/`, (err, files) => {
    files.forEach((f) => {
      if (f != 'index.js') {
        const props = require(`./${f}`);
        bot.statsCommands.set(props.help.name, props);
      }
    });
  });
};
exports.stop = (bot) => {
  bot.statsCommands = null;
};