const getSettings = require('../services/getSettings');
const SonarrAPI = require('sonarr-api');

exports.run = (bot, msg, params = []) => {
  let max = 4462;
  getSettings(msg.guild.id)
  .then((settings) => {
    settings = JSON.parse(settings);
    const sonarrHost = settings.find(x => x.setting == "sonarr.host");
    const sonarrBaseurl = settings.find(x => x.setting == "sonarr.baseurl");
    const sonarrApikey = settings.find(x => x.setting == "sonarr.apikey");
    const sonarrDefaultProfileId = settings.find(x => x.setting == "sonarr.defaultprofileid");
    const sonarrDefaultRootPath = settings.find(x => x.setting == "sonarr.defaultrootpath");

    const sonarr = new SonarrAPI({
      hostname: sonarrHost.value.split(":")[0],
      apiKey: sonarrApikey.value,
      port: sonarrHost.value.split(":")[1],
      urlBase: sonarrBaseurl.value
    });
  msg.channel.send('Airing tonight:');
  let today = new Date();
  let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  today.setUTCHours(20);
  tomorrow.setUTCHours(0o6);
  sonarr.get("calendar", {
    "start": today.toISOString(),
    "end": tomorrow.toISOString()
  }).then(function (result) {
    msg.channel.startTyping();
    result.forEach(r => {
      msg.channel.send({
        "embed": {
          "title": r.title,
          "color": 1360941,
          "author": {
            "name": `${r.series.title} S${r.seasonNumber}E${r.episodeNumber})`
          },
          "fields": [
            {
              "name": "Channel",
              "value": r.series.network,
              "inline": true
            },
            {
              "name": "Runtime",
              "value": `${r.series.runtime} mins`,
              "inline": true
            },
            {
              "name": "When",
              "value": `${r.airDate} ${r.series.airTime}`,
              "inline": true
            }
          ]
        }
      });
      msg.channel.stopTyping();
    });
  }, function (err) {
    msg.channel.send(`There was a error processing the request: ${err}`);
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
  name: "tonight",
  description: "Whats on TV tonight?",
  usage: "tonight"
};
