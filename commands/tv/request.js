exports.run = (bot, msg, args = []) => {
  msg.channel.send('Sorry. Request functionality is not built in... yet');
};
exports.help = {
  name: 'request',
  description: 'Requests a TV show on Ombi',
  usage: 'tv request <tvdbId>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};