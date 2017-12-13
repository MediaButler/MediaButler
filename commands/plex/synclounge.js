const Discord = require('discord.js');
const createInvite = require('../../util/synclounge/createInvite');
const createPTLinkModal = require('../../util/synclounge/createPTLinkModal');
exports.run = (bot, msg, args = []) => {
  createInvite(msg.guild.id)
    .then((resultData) => {
      const e = createPTLinkModal(resultData);
      e.setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL);
      msg.channel.send({ 'embed': e });
    })
    .catch((e) => {
      console.log('Error creating SyncLounge Link:', e);
    });
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['pt'],
  permLevel: 0 
};
exports.help = {
  name: 'synclounge',
  description: 'Creates an invite link for SyncLounge',
  usage: 'plex synclounge'
};