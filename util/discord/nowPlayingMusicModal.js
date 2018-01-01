const Discord = require('discord.js');
module.exports = (nowPlayingItem) =>
{
  const audio_decision =
    nowPlayingItem.audio_decision.charAt(0).toUpperCase() +
    nowPlayingItem.audio_decision.substring(1, nowPlayingItem.audio_decision.length + 1);
  const state =
    nowPlayingItem.state.charAt(0).toUpperCase() +
    nowPlayingItem.state.substring(1, nowPlayingItem.state.length + 1);
  const e = new Discord.RichEmbed()
    .setTitle(`${nowPlayingItem.grandparentTitle} - ${nowPlayingItem.title}`)
    .setColor(11360941)
    .setTimestamp()
    .setAuthor(`Stream Info (${nowPlayingItem.session_key})`)
    .addField('Audio Decision', `${audio_decision}`, true)
    .addField('Player', nowPlayingItem.product, true)
    .addField('Current State', state, true)
    .addField('Estimated Bandwidth', `${nowPlayingItem.bandwidth} kbps`, true)
  return e;
};