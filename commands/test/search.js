exports.run = (bot, msg, args = []) => {
  msg.channel.send(`this is search, searching for '${args.join(' ')}'`);
};
exports.help = {
  name: 'search',
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};