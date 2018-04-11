exports.run = (bot, msg, args = []) => {
  if (!msg.guild.isPlaying) { msg.channel.send('No Queue'); }
  const number = parseInt(args[0]) - 1;
  const old = msg.guild.mediaQueue[number];
  msg.guild.mediaQueue.splice(number, 1);
  msg.channel.send(`Deleted item '${old.artist} - ${old.title}' from the queue`);
};
exports.help = {
  name: 'del',
  description: 'del',
  usage: 'music del'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};