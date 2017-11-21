const request = require('request');
const Discord = require('discord.js');
const createTvShowItemModal = require('../services/createTvShowItemModal');
exports.run = (bot, msg, args = []) => {
  let max = 4462;
  let url = `http://www.omdbapi.com/?t=${args.join(" ")}&apikey=5af02350&type=series`;
  request(url, function (error, res, body) {
  if (!error && res.statusCode === 200) {
    let info = JSON.parse(body);
    let e = createTvShowItemModal(info);
    e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
    msg.channel.send({ "embed": e });
    }
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