const Discord = require('discord.js');

    function leadingZero(n) {
	    return (n < 10) ? ("0" + n) : n;
	}

module.exports = (guild, tvShowItem) => {
  console.log((guild.settings.emby.external_link + "/Items/" + tvShowItem.Id + "/Images/Primary"))
  const i = new Discord.RichEmbed()
    .setTitle(`${tvShowItem.SeriesName} (S${leadingZero(tvShowItem.ParentIndexNumber)}E${leadingZero(tvShowItem.IndexNumber)})`)
    .setDescription(tvShowItem.Name)
    .setThumbnail(guild.settings.emby.external_url + "/Items/" + tvShowItem.Id + "/Images/Primary")
    .setColor(3447003)
    .setTimestamp()
  return i;
};