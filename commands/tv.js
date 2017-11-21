const request = require('request');
const Discord = require('discord.js');
const createTvShowItemModal = require('../services/createTvShowItemModal');
const getTvShowInfo = require('../services/getTvShowInfoFromOmdb');
exports.run = (bot, msg, args = []) => {
  getTvShowInfo(args)
  .then((tvShow) => {
    let e = createTvShowItemModal(tvShow);
    e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
    msg.channel.send({ "embed": e });
  });
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: "tv",
  description: "Pulls info for series or anime.",
  usage: "tv <show>"
};