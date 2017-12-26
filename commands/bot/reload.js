const loadDb = require('../../util/db/loadDb');
exports.run = (bot, msg, args = []) => {
  loadDb(bot);
  msg.channel.send('Reloaded all settings');
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['pt'],
  permLevel: 0 
};
exports.help = {
  name: 'reload',
  description: 'Reloads bot configuration files.',
  usage: 'bot reload'
};