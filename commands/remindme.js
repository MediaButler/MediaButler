const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (args[0] === null) {
    message.channel.send(
      'Specify a length of time to remind you in minutes, e.g. +remindme 60 brush my teeth'
    );
  } else if (args[1] === null) {
    message.channel.send('Specify what I should remind you about');
  } else if (isNaN(args[0])) {
    message.channel.send('Invalid input, first argument should be a number');
  } else {
    const value = args[0];
    const final = value * 60000;
    const original = args.slice(1);
    const finalText = original.join(' ');
    message.channel.send(`I will make sure to remind you in ${value} minute(s).`);

    function timer() {
      setTimeout(function() {
        message.reply(`Hey! I almost forgot, I had to remember to tell you this: "${finalText}"`);
      }, final);
    }

    timer();
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'remindme',
  description: 'Tell me when and what to remind you.',
  usage: 'remindme <subject>'
};
