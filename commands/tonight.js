const apiauth = require('../apiauth.json');
var SonarrAPI = require('../node_modules/sonarr-api/lib/api.js');
var sonarr = new SonarrAPI({
  hostname: apiauth.sonarr_host.split(":")[0],
  apiKey: apiauth.sonarr_apikey,
  port: apiauth.sonarr_host.split(":")[1],
  urlBase: apiauth.sonarr_baseurl
});

exports.run = (bot, msg, params = []) => {
  const max = 4462;
  msg.channel.sendMessage('Airing tonight:');
var today = new Date();
var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
today.setUTCHours(20);
tomorrow.setUTCHours(06);
sonarr.get("calendar", { "start": today.toISOString(), "end": tomorrow.toISOString() }).then(function (result) {
  msg.channel.startTyping();
  result.forEach(r => {
    msg.channel.send({
     "embed": {
       "title": r.title,
       "color":  1360941,
       "author": {
         "name": r.series.title + " (S" + r.seasonNumber + "E" + r.episodeNumber + ")"
       },
       "fields": [
       {
         "name": "Channel",
         "value": r.series.network,
         "inline": true
       },
       {
         "name": "Runtime",
         "value": r.series.runtime + " mins",
         "inline": true
       },
       {
         "name": "When",
         "value": r.airDate + " " + r.series.airTime,
         "inline": true
     }
   ]
 }});
msg.channel.stopTyping();
  });
}, function (err) {
    msg.channel.send("There was a error processing the request: " + err);
});

};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name : "tonight",
  description: "Whats on TV tonight?",
  usage: "tonight"
};
