const Discord = require('discord.js');
module.exports = (seasonItem) =>
{
  const e = new Discord.RichEmbed()
    .setTitle(`${seasonItem.Title} Season ${seasonItem.Season}`)
    .setDescription(`${seasonItem.Title} consists of ${seasonItem.totalSeasons} Seasons.\nHere are the episodes from Season ${seasonItem.Season}`)
    .setColor(13619085);
  seasonItem.Episodes.forEach(episode => {
    e.addField(`Episode ${episode.Episode}`, episode.Title);
  });
  return e;
};