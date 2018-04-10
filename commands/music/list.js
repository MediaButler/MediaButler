const durationFormat = require('../../util/durationFormat');

exports.run = (bot, msg, args = []) => {
    if (msg.guild.mediaQueue.length == 0) {
        msg.channel.send('Queue is Empty');
        return;
    }
    let results = '\n';
    for (let i = 0; i < msg.guild.mediaQueue.length; i++) {
        results += `(${i+1}) - ${msg.guild.mediaQueue[i].artist} - ${msg.guild.mediaQueue[i].title} [${durationFormat(Math.ceil(msg.guild.mediaQueue[i].duration/1000))}]\n`;
    }
    msg.channel.send(`\`\`\`${results}\`\`\``);
};
exports.help = {
  name: 'list',
  description: 'list',
  usage: 'music list'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};