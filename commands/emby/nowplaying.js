
const createNowPlayingModal = require('../../util/emby/createNowPlayingModal');
const getNowPlaying = require('../../util/emby/getNowPlaying');
const Discord = require('discord.js');

exports.run = (bot, msg, params = []) => {
  msg.channel.send("Warming up...")
    .then((m) => {
      m.edit("Querying Emby to see who is watching right now");
      getNowPlaying(msg.guild)
        .then((nowPlaying) => {
          if(nowPlaying.length !== 1) {
            m.edit(`There are currently ${nowPlaying.length} people watching.`);
          }
          else {
            m.edit(`There is currently ${nowPlaying.length} person watching.`);
          }
          nowPlaying.forEach(s => { 
            const e = createNowPlayingModal(msg.guild, s);     
            e.setFooter(`Requested By ${msg.author.username}`, msg.author.avatarURL);
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
  description: "Pulls what is currently being played on the server",
  usage: "emby nowplaying"
};
