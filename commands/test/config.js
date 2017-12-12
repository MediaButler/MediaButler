exports.run = (bot, msg, args = []) => {
  msg.channel.send(`this is config, arguments: ${args.join(' ')}`);
};
exports.help = {
  name: 'config',
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};