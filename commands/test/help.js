exports.run = (bot, msg, args = []) => {
  msg.channel.send('this is help');
};
exports.help = {
  name: 'help',
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};