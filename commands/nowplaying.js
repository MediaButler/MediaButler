const createNowPlayingModal = require('../util/createNowPlayingItemModal');
const getNowPlaying = require('../util/getNowPlayingFromPlexpy');
const Discord = require('discord.js');
exports.run = (bot, msg, params = []) => {
  msg.channel.send("Starting...")
  .then((m) => {
    m.edit("Querying PlexPy for current activity.");
    getNowPlaying(msg.guild.id)
    .then((nowPlaying) => {
      m.edit(`There are currently ${nowPlaying.data.stream_count} streams.`);
      nowPlaying.data.sessions.forEach(s => { 
        let e = createNowPlayingModal(s);
        e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);        
        msg.channel.send({ embed: e });
      });
      msg.channel.stopTyping();
    }).catch((e) => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); });
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