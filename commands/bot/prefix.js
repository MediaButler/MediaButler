const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
  if (!args[0]) {
    msg.channel.send(`ERR: No prefix specified. (Current is ${msg.guild.settings.prefix})`);
    return;
  }
  msg.guild.settings.prefix = args[0];
  saveDb(bot);
  msg.channel.send(`Updated prefix to ${args[0]}`);
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 3 
};
exports.help = {
  name: 'prefix',
  description: 'Changes prefix for bot',
  usage: 'bot prefix'
};