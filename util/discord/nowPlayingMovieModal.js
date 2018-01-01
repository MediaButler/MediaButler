const Discord = require('discord.js');
module.exports = (nowPlayingItem) =>
{
  const video_decision =
    nowPlayingItem.video_decision.charAt(0).toUpperCase() +
    nowPlayingItem.video_decision.substring(1, nowPlayingItem.video_decision.length + 1);
  const audio_decision =
    nowPlayingItem.audio_decision.charAt(0).toUpperCase() +
    nowPlayingItem.audio_decision.substring(1, nowPlayingItem.audio_decision.length + 1);
  const state =
    nowPlayingItem.state.charAt(0).toUpperCase() +
    nowPlayingItem.state.substring(1, nowPlayingItem.state.length + 1);
  const e = new Discord.RichEmbed()
    .setTitle(nowPlayingItem.title)
    .setDescription(nowPlayingItem.summary)
    .setColor(11360941)
    .setTimestamp()
    .setAuthor(`Stream Info (${nowPlayingItem.session_key})`)
    .addField('Stream Resolution', `${nowPlayingItem.stream_video_width}x${nowPlayingItem.stream_video_height}`, true)
    .addField('Video/Audio Decision', `${video_decision}/${audio_decision}`, true)
    .addField('Player', nowPlayingItem.product, true)
    .addField('Current State', state, true)
    .addField('Estimated Bandwidth', `${nowPlayingItem.bandwidth} kbps`, true)
    .addBlankField(true);    
  return e;
};