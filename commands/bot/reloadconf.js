const loadDb = require('../../util/db/loadDb');
exports.run = (bot, msg, args = []) => {
  loadDb(bot);
  msg.channel.send('Reloaded all settings');
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'reloadconf',
  description: 'Reloads bot configuration files.',
  usage: 'bot reloadconf'
};