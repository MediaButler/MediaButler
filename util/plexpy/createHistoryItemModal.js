const Discord = require('discord.js');
const timeConverter = require('../timeConverter');
module.exports = (historyItem) =>
{
  const i = new Discord.RichEmbed()
    .setTitle(historyItem.full_title)
    .setColor(11360941)
    .setAuthor('History Item')
    .addField('Watched at', timeConverter(historyItem.started), true)
    .addField('Type', historyItem.transcode_decision, true)
    .addField('Player', `${historyItem.platform} ${historyItem.player}`, true)
    .addField('Watched', `${historyItem.percent_complete}%`, true);
  return i;
};