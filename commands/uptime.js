const Discord = require('discord.js');

exports.run = (client, message) => {
  const ms = client.uptime;
  const cd = 24 * 60 * 60 * 1000; // Calc days
  const ch = 60 * 60 * 1000; // Calc hours
  const cm = 60 * 1000; // Calc minutes
  const cs = 1000; // Calc seconds
  let days = Math.floor(ms / cd);
  const dms = days * cd; // Days, in ms
  let hours = Math.floor((ms - dms) / ch);
  const hms = hours * ch; // Hours, in ms
  let minutes = Math.floor((ms - dms - hms) / cm);
  const mms = minutes * cm; // Minutes, in ms
  let seconds = Math.round((ms - dms - hms - mms) / cs);
  if (seconds === 60) {
    minutes++; // Increase by 1
    seconds = 0;
  }
  if (minutes === 60) {
    hours++; // Inc by 1
    minutes = 0;
  }
  if (hours === 24) {
    days++; // Increase by 1
    hours = 0;
  }
  const dateStrings = [];

  if (days === 1) {
    dateStrings.push('**1** day');
  } else if (days > 1) {
    dateStrings.push(`**${String(days)}** days`);
  }

  if (hours === 1) {
    dateStrings.push('**1** hour');
  } else if (hours > 1) {
    dateStrings.push(`**${String(hours)}** hours`);
  }

  if (minutes === 1) {
    dateStrings.push('**1** minute');
  } else if (minutes > 1) {
    dateStrings.push(`**${String(minutes)}** minutes`);
  }

  if (seconds === 1) {
    dateStrings.push('**1** second');
  } else if (seconds > 1) {
    dateStrings.push(`**${String(seconds)}** seconds`);
  }

  let dateString = '';
  for (let i = 0; i < dateStrings.length - 1; i++) {
    dateString += dateStrings[i];
    dateString += ', ';
  }
  if (dateStrings.length >= 2) {
    dateString = dateString.slice(0, dateString.length - 2) + dateString.slice(dateString.length - 1);
    dateString += 'and ';
  }
  dateString += dateStrings[dateStrings.length - 1];
  const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setThumbnail(message.author.iconURL)
    .addField(':clock: uptime', 'Bot\'s uptime', true)
    .addField(':runner: Running on:', `**${client.guilds.size}** server(s)`, true)
    .addField(':white_check_mark: Active for:', dateString, true)
    .setColor(6583245);
  message.channel.send({ embed })
    .catch(console.error);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
module.exports.help = {
  name: 'uptime',
  description: 'Stats about the current bot\'s uptime.',
  usage: 'uptime'
};
