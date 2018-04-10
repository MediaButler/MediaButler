exports.run = (bot, msg, args = []) => {
    if (!args[0]) {
      const commandNames = Array.from(bot.musicCommands.keys());
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      msg.channel.send(`= Command List =\n\n[Use ${msg.guild.settings.prefix}music help <command> for details]\n\n${bot.musicCommands.map(c => `${msg.guild.settings.prefix}music ${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, { code: 'asciidoc' });
    } else {
      let command = args[0];
      if (bot.musicCommands.has(command)) {
        command = bot.musicCommands.get(command);
        msg.channel.send(`= ${command.help.name} = \n\n[${command.help.description}]\n\nusage :: ${msg.guild.settings.prefix}${command.help.usage}`, { code: 'asciidoc' });
      }
    }
  };
  exports.help = {
    name: 'help',
    description: 'Provides help on the Music commands',
    usage: 'music help [command]'
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };