const stopQueue = require('./stopQueue');
const Discord = require('discord.js');
const durationFormat = require('../durationFormat');
module.exports = (message) => {
  const playQueue = module.exports;
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join().then((conn) => {
      message.guild.isPlaying = true;
      const runtime = durationFormat(Math.ceil(message.guild.mediaQueue[0].duration/1000));
      const i = new Discord.RichEmbed()
        .setColor(11360941)
        .setDescription(message.guild.mediaQueue[0].album)
        .setTitle(`${message.guild.mediaQueue[0].artist} - ${message.guild.mediaQueue[0].title}`)
        .setThumbnail('attachment://cover.png')
        .setAuthor('Now Playing')
        .addField('Year', message.guild.mediaQueue[0].year, true)
        .addField('Runtime', `\`\`\`0m 1s ► |-------------------| ${runtime}\`\`\``, true);
      message.client.user.setPresence({game: {name: `${message.guild.mediaQueue[0].artist} - ${message.guild.mediaQueue[0].title}`, type: 0}});
      message.channel.send({ 'embed': i, 'files': [{ attachment: message.guild.mediaQueue[0].image, name: 'cover.png' }] }).then((m) => {
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