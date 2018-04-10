const stopQueue = require('./stopQueue');
const Discord = require('discord.js');
const durationFormat = require('../durationFormat');
module.exports = (message) => {
  const playQueue = module.exports;
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join().then((conn) => {
      message.guild.isPlaying = true;
      const i = new Discord.RichEmbed()
        .setColor(11360941)
        .setTitle(message.guild.mediaQueue[0].title)
        .setThumbnail(message.guild.mediaQueue[0].image)
        .setAuthor(message.guild.mediaQueue[0].artist)
        .addField('Album', message.guild.mediaQueue[0].album, true)
        .addField('Runtime', durationFormat(Math.ceil(message.guild.mediaQueue[0].duration/1000)), true);
      message.channel.send(i).then((m) => {
        setTimeout(() => {
          m.delete();
        }, 20000);
      });
      message.guild.mediaController = conn.playArbitraryInput(message.guild.mediaQueue[0].url);
      message.guild.mediaController.on('end', () => {
        message.guild.mediaQueue.shift();
        if (message.guild.mediaQueue.length > 0) playQueue(message);
        else stopQueue(message);
      });
      message.guild.mediaController.setVolume(0.2);
    });
  }
};