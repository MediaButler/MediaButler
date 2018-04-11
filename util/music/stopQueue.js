module.exports = (message) => {
  if (message.guild.isPlaying) {
    message.guild.isPlaying = false;
    message.guild.mediaQueue = [];
    message.guild.mediaController.end();
    message.member.voiceChannel.leave();
    message.client.user.setPresence({game: {name: `MediaButler v${message.client.mbVersion}`, type: 0}});
  }
};