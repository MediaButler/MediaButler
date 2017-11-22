const createNowPlayingModal = require('../util/createNowPlayingItemModal');
const getNowPlaying = require('../util/getNowPlayingFromPlexpy');
const Discord = require('discord.js');
exports.run = (bot, msg, params = []) => {
  msg.channel.send("Starting...")
  .then((m) => {
    m.edit("Querying PlexPy for current activity.");
    getNowPlaying(msg.guild.id)
    .then((nowPlaying) => {
      console.log(nowPlaying);
      m.edit(`There are currently ${nowPlaying.data.stream_count} streams.`);
      data.sessions.forEach(s => { msg.channel.send(`{embed: ${createNowPlayingModal(s)}`) });
      msg.channel.stopTyping();
    })
    .catch((e) => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); });
  });
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['np'],
  permLevel: 0
};
exports.help = {
  name: "nowplaying",
  description: "Pulls what's currently being played on the server",
  usage: "nowplaying"
};