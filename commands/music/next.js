exports.run = (bot, msg, args = []) => {
  if (msg.guild.isPlaying) msg.guild.mediaController.end();
};
exports.help = {
  name: 'next',
  description: 'next',
  usage: 'music next'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};