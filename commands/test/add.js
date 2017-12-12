exports.run = (bot, msg, args = []) => {
  msg.channel.send(`this is add, searching for '${args.join(' ')}'`);
};
exports.help = {
  name: 'add',
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};