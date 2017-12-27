exports.run = (bot, msg, args = []) => {
  if (!args[0]) {
    const commandNames = Array.from(bot.botCommands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    msg.channel.send(`= Command List =\n\n[Use ${msg.guild.settings.prefix}bot help <command> for details]\n\n${bot.botCommands.map(c => `${msg.guild.settings.prefix}bot ${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, { code: 'asciidoc' });
  } else {
    let command = args[0];
    if (bot.botCommands.has(command)) {
      command = bot.botCommands.get(command);
      msg.channel.send(`= ${command.help.name} = \n\n[${command.help.description}]\n\nusage :: ${msg.guild.settings.prefix}${command.help.usage}`, { code: 'asciidoc' });
    }
  }
};
exports.help = {
  name: 'help',
  description: 'Provides help on the Bot commands',
  usage: 'bot help [command]'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};