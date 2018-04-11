const shuffleQueue = require('../../util/music/shuffleQueue');
exports.run = (bot, msg, args = []) => {
  if (!msg.guild.isPlaying) { msg.channel.send('No queue'); return; }
  msg.guild.mediaQueue = shuffleQueue(msg);
  msg.channel.send('Queue Shuffled');
};
exports.help = {
  name: 'shuffle',
  description: 'shuffle',
  usage: 'music shuffle'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};