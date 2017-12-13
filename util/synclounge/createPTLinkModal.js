const Discord = require('discord.js');
module.exports = (linkResult) =>
{
  const e = new Discord.RichEmbed()
    .setTitle('SyncLounge Room')
    .setColor(13619085)
    .setTimestamp()
    .addField('Invite Link', linkResult.url, true)
    .addField('Room Name', linkResult.details.ptroom, true)
    .addField('Room Password', linkResult.details.ptpassword, true)  
    .addField('Server', linkResult.details.ptserver, true)  
    .addField('Room Owner', linkResult.details.owner, true)
    .setURL(linkResult.url);
  return e;
};