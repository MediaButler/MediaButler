const settings = require(`${process.cwd()}/settings.json`);
exports.run = (bot, msg, args = []) => {
  if (!args[0]) {
    const commandNames = Array.from(bot.plexCommands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    msg.channel.send(`= Command List =\n\n[Use ${settings.prefix}plex help <command> for details]\n\n${bot.plexCommands.map(c => `${settings.prefix}plex ${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, { code: 'asciidoc' });
  } else {
    let command = args[0];
    if (bot.plexCommands.has(command)) {
      command = bot.plexCommands.get(command);
      msg.channel.send(`= ${command.help.name} = \n\n[${command.help.description}]\n\nusage :: ${settings.prefix}${command.help.usage}`, { code: 'asciidoc' });
    }
  }
};
exports.help = {
  name: 'help',
  description: 'Provides help on the Plex commands',
  usage: 'plex help [command]'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};