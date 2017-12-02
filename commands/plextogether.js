const Discord = require('discord.js');
const createInvite = require('../util/plextogether/createInvite');
const createPTLinkModal = require('../util/plextogether/createPTLinkModal');
exports.run = (bot, msg, args = []) => {
  createInvite(msg.guild.id)
  .then((resultData) => {
    let e = createPTLinkModal(resultData);
    e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
    msg.channel.send({ "embed": e });
  })
  .catch((e) => {
    console.log('Error creating PlexTogether Link:', e)
  })
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['pt'],
  permLevel: 0 
};
exports.help = {
  name: "plextogether",
  description: "Creates an invite link for PlexTogether",
  usage: "plextogether"
};