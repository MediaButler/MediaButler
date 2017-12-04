const Discord = require('discord.js');
module.exports = (tvShowItem) => {
  const i = new Discord.RichEmbed()
    .setTitle(tvShowItem.title)
    .setColor(1360941)
    .setAuthor(`${tvShowItem.series.title} (S${tvShowItem.seasonNumber}E${tvShowItem.episodeNumber})`)
    .addField('Channel', tvShowItem.series.network, true)
    .addField('Runtime', `${tvShowItem.series.runtime} mins`, true)
    .addField('Airs', `${tvShowItem.airDate} ${tvShowItem.series.airTime}`, true);
  return i;
};