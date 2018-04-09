const Discord = require('discord.js');
module.exports = message => {
  let command;
  let params;
  let perms;
  const client = message.client;
  if (message.author.bot) return;
  if (message.channel.type == 'dm') {
    if (!message.content.startsWith('!')) return;
    command = message.content.split(' ')[0].slice('!'.length);
    params = message.content.split(' ').slice(1);
    perms = 4;
  }
  else {
    if (!message.content.startsWith(message.guild.settings.prefix)) return;
    command = message.content.split(' ')[0].slice(message.guild.settings.prefix.length);
    params = message.content.split(' ').slice(1);
    perms = client.elevation(message);
  }
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
    // if (message.guild.settings.logchannel) {
    //   const embed = new Discord.RichEmbed()
    //     .setColor(7221572)
    //     .setTimestamp()
    //     .setAuthor(message.author.username)
    //     .setTitle('Command Called')
    //     .addField('Command', command, false)
    //     .addField('Arguments', message.content, false);
    //   message.guild.channels.find('name', message.guild.settings.logchannel).send({embed});
    // }
  }
};
