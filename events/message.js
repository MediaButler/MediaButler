const Discord = require('discord.js');
module.exports = message => {
  const client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(message.guild.settings.prefix)) return;
  const command = message.content.split(' ')[0].slice(message.guild.settings.prefix.length);
  const params = message.content.split(' ').slice(1);
  const perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
    if (message.guild.settings.logchannel) {
      const embed = new Discord.RichEmbed()
        .setColor(7221572)
        .setTimestamp()
        .setAuthor(message.author.username)
        .setTitle('Command Called')
        .addField('Command', command, false)
        .addField('Arguments', message.content, false);
      message.guild.channels.find('name', message.guild.settings.logchannel).send({embed});
    }
  }
};
