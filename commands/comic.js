const Discord = require('discord.js');
const createComicItemModal = require('../util/comic/createComicModal');
const getComicInfo = require('../util/comic/getComicApi');
exports.run = (bot, msg, args = []) => {
  getComicInfo(args)
    .then((comicInfo) => {
      const e = createComicItemModal(comicInfo);
      e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
      msg.channel.send({ 'embed': e });
    });
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
