const Discord = require('discord.js');
const createMangaItemModal = require('../util/manga/createMangaModal');
const getMangaInfo = require('../util/manga/getMangaApi');
exports.run = (bot, msg, args = []) => {
  getMangaInfo(args)
    .then((mangaInfo) => {
      const e = createMangaItemModal(mangaInfo);
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
  name: 'manga',
  description: 'Pulls info for a manga.',
  usage: 'manga <manganame>'
};
