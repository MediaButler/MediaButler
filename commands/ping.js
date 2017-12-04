exports.run = (client, message, args, perms) => {
  message.channel.send('Ping?')
    .then(msg => {
      msg.edit(`I'm still working! (It took me ${msg.createdTimestamp - message.createdTimestamp}ms to respond)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};
