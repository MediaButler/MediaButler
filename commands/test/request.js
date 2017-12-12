exports.run = (bot, msg, args = []) => {
  msg.channel.send(`this is request, searching for '${args.join(' ')}'`);
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