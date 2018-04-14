const stopQueue = require('../../util/music/stopQueue');
exports.run = (bot, msg, args = []) => {
  if (msg.guild.mediaQueue.length == 0) {
    msg.channel.send('Queue is Empty');
    return;
  }
  stopQueue(msg);
};
exports.help = {
  name: 'stop',
  description: 'stop',
  usage: 'music stop'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};