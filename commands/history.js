const getSettings = require('../services/getSettings');
const createHistoryItemModal = require('../services/createHistoryItemModal');
const request = require('request');
const Discord = require('discord.js');
exports.run = (bot, msg, params = []) => {
  getSettings(msg.guild.id)
  .then((settings) => {
    settings = JSON.parse(settings);
    const plexpyHost = settings.find(x => x.setting == "plexpy.host").value;
    const plexpyBaseurl = settings.find(x => x.setting == "plexpy.baseurl").value;
    const plexpyApikey = settings.find(x => x.setting == "plexpy.apikey").value;
    let queryLength = 5;
    if (plexpyHost == null || plexpyBaseurl == null || plexpyApikey == null) { msg.channel.send("ERR: PlexPy not configured"); return; }
    if (!params[0]) {
      msg.channel.send("ERR: No username specified"); 
      return;
    }
    let query = params[0];
    if (params[1]) queryLength = params[1];
    let url = `http://${plexpyHost}${plexpyBaseurl}/api/v2?apikey=${plexpyApikey}&cmd=get_history&length=${queryLength}&user=${query}`;
    msg.channel.startTyping();
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let info = JSON.parse(body);
        const embed = new Discord.RichEmbed()
        .setAuthor(`Stats for ${params[0]}`).setColor(11360941).setTimestamp()
        .setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL)
        .addField("Total Duration", info.response.data.total_duration, true)
        .addField("Shown Duration", info.response.data.filter_duration, true);
        msg.channel.send({embed});
        if (info.response.data.data.length === 0) msg.channel.send("Sorry, no results found");
        info.response.data.data.forEach(f => {
          msg.channel.send({embed: createHistoryItemModal(f)});
        });
      }
      msg.channel.stopTyping();
    });
  });
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: "history",
  description: "Pulls the <user>'s last [limit] history items",
  usage: "history <user> [limit]"
};