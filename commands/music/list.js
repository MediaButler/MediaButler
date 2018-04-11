const durationFormat = require('../../util/durationFormat');
const Discord = require('discord.js');

exports.run = (bot, msg, args = []) => {
  if (msg.guild.mediaQueue.length == 0) {
    msg.channel.send('Queue is Empty');
    return;
  }
  let results = '\n';
  let totalDuration = 0;
  let limit = 30;
  if (msg.guild.mediaQueue.length < limit) limit = msg.guild.mediaQueue.length;
  for (let i = 0; i < msg.guild.mediaQueue.length; i++) totalDuration += parseInt(msg.guild.mediaQueue[i].duration);
  for (let i = 0; i < limit; i++) {
    results += `${exports.pad(i+1, 2)} :: ${msg.guild.mediaQueue[i].artist} - ${msg.guild.mediaQueue[i].title} [${durationFormat(Math.ceil(msg.guild.mediaQueue[i].duration/1000))}]\n`;
  }
  const i = new Discord.RichEmbed()
    .setColor(15422502)
    .setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL)
    .setDescription('Current Queue')
    .setTitle('Queue')
    .addField('Total Tracks', msg.guild.mediaQueue.length, true)
    .addField('Total Runtime', durationFormat(Math.ceil(totalDuration/1000)), true)
    .addField('Tracks', `\`\`\`${results}\`\`\``);
  msg.channel.send(i);
};
exports.help = {
  name: 'list',
  description: 'list',
  usage: 'music list'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.pad = (n, width, z) => {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};