const Discord = require('discord.js');
const createComicItemModal = require('../util/comic/createComicModal');
const getComicInfo = require('../util/comic/getComicApi');
exports.run = (bot, msg, args = []) => {
  switch (args[0]) {
    case 'search' || 'Search':
      const query = args.slice(1);
      msg.channel.send(`Looking up ${query.join(' ')} for you!`)
        .then((m) => {
          getComicInfo(query.join(' '))
            .then((comicInfo) => {
              console.log(query.join(' '));
              const e = createComicItemModal(comicInfo);
              e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
              m.edit({ 'embed': e });
            });
        });
      break;

    case 'add' || 'Add':
      msg.channel.send('Add command not yet available');
      break;

    default:
      msg.channel.send('No command specified. Try using \'comic search <volumename>\'');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'comic',
  description: 'Pulls info for a comic.',
  usage: 'comic <volumename>'
};
