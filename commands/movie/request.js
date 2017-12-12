exports.run = (bot, msg, args = []) => {
  msg.channel.send('Sorry. Request functionality is not built in... yet');
};
exports.help = {
  name: 'request',
  description: 'Requests a movie on Ombi',
  usage: 'movie request <imdbId>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};