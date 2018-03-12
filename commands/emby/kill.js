
const killStream = require('../../util/emby/killStream');
const getNowPlaying = require('../../util/emby/getNowPlaying');

exports.run = (bot, msg, args = [], perms) => {
  msg.channel.send('Starting...')
    .then((m) => {
          const streamId = args[0];
          if (!args[0]) {
            m.edit('ERR: No stream id to kill provided.');
            return;
          }
          getNowPlaying(msg.guild)
            .then((streams) => { 
              streams.forEach((stream) => {
                if (stream.Id == streamId) {
                  m.edit(`Killing stream ${stream.Id}`);
                  killStream(msg.guild, stream).then(() => { m.edit('Sucessfully sent request to kill stream'); });
                }
              });
            });
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'kill',
  description: 'Kills stream playing from Emby.',
  usage: 'emby kill <streamId>'
};