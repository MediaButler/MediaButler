const getSettings = require('../services/getSettings');
const request = require('request');

exports.run = (bot, msg, params = []) => {
  let max = 4462;
  getSettings(msg.guild.id)
  .then((settings) => {
    settings = JSON.parse(settings);
    let plexpyHost = settings.find(x => x.setting == "plexpy.host").value;
    let plexpyBaseurl = settings.find(x => x.setting == "plexpy.baseurl").value;
    let plexpyApikey = settings.find(x => x.setting == "plexpy.apikey").value;
  let url;
  if (params[1] === undefined) {
    url = `http://${plexpyHost}${plexpyBaseurl.value}/api/v2?apikey=${plexpyApikey}&cmd=get_history&length=5&user=${params[0]}`;
  } else {
    url = `http://${plexpyHost}${plexpyBaseurl.value}/api/v2?apikey=${plexpyApikey}&cmd=get_history&length=${params[1]}&user=${params[0]}`;
  }
  msg.channel.startTyping();
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let info = JSON.parse(body);
      const embed = new Discord.RichEmbed()
      .setAuthor(`Stats for ${params[0]}`)
      .setColor(11360941)
      .setTimestamp()
      .setFooter(`Called by ${msg.author.username}`, msg.author.avatarURL)
      .addField("Total Duration", info.response.data.total_duration, true)
      .addField("Shown Duration", info.response.data.filter_duration, true);
      msg.channel.send({embed});

      if (info.response.data.data.length > 0) {
        info.response.data.data.forEach(f => {
          const embedItem = new Discord.RichEmbed()
          .setTitle(f.full_title)
          .setColor(11360941)
          .setAuthor("History Item")
          .addField("Watched at", timeConverter(f.started), true)
          .addField("Type", f.transcode_decision, true)
          .addField("Player", `${f.platform} ${f.player}`, true)
          .addField("Watched", `${f.percent_complete}%`, true);
          msg.channel.send({embedItem})
        })
      } else {
        msg.channel.send("Sorry, no results found");
      }
    }
    msg.channel.stopTyping();
  });
});
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "history",
  description: "Pulls the <user>'s last [limit] history items",
  usage: "history <user> [limit]"
};

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return time;
}