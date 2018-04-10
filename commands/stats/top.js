const getTopStats = require('../../util/tautulli/getTopStats');
const durationFormat = require('../../util/durationFormat');
const Discord = require('discord.js');
exports.run = (bot, msg, args = []) => {
  msg.channel.send('Starting...')
    .then((m) => {
      m.edit('Querying Tautulli for top stats.');
      getTopStats(msg.guild)
        .then((stats) => {
          const s = stats.find(o => o.stat_id == 'top_platforms');
          const embed = new Discord.RichEmbed()
            .setTitle(s.stat_title);
          let i = 1;
          s.rows.forEach(e => {
            embed.addField(`${i}) ${e.platform}`, `${durationFormat(e.total_duration)} [${e.total_plays} plays]`, true);
            i++;
          });
          m.edit({ embed });
          msg.channel.stopTyping();
        }).catch((e) => { m.edit(`ERR: ${e}`); msg.channel.stopTyping(); });
    });
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'top',
  description: 'Top stats',
  usage: 'stats top'
};