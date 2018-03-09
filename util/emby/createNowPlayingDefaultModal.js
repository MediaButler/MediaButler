const Discord = require('discord.js');

module.exports = (guild, item) => {
  const i = new Discord.RichEmbed()
    .setTitle(item.Name)
    .setThumbnail(guild.settings.emby.external_url + "/Items/" + item.Id + "/Images/Primary")
    .setColor(3447003)
    .setTimestamp()
  return i;
};