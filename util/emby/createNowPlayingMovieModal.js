const Discord = require('discord.js');

module.exports = (guild, movieItem) => {
  const i = new Discord.RichEmbed()
    .setTitle(movieItem.Name)
    .setDescription(movieItem.Overview)
    .setThumbnail(guild.emby.external_url + "/Items/" + movieItem.Id + "/Images/Primary")
    .setColor(3447003)
    .setTimestamp()
  return i;
};