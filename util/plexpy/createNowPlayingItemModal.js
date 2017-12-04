const Discord = require('discord.js');
module.exports = (nowPlayingItem) =>
{
  const e = new Discord.RichEmbed()
    .setTitle(nowPlayingItem.full_title)
    .setDescription(nowPlayingItem.summary)
    .setColor(11360941)
    .setTimestamp()
    .setAuthor(`Stream Info (${nowPlayingItem.session_key})`)
    .addField('Resolution', `${nowPlayingItem.stream_video_width}x${nowPlayingItem.stream_video_resolution}`, true)
    .addField('Type', nowPlayingItem.video_decision, true)
    .addField('Player', nowPlayingItem.product, true);
  return e;
};