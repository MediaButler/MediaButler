const apiauth = require('../apiauth.json');
const request = require('request');
exports.run = (bot, msg, params = []) => {
  const max = 4462;

  msg.channel.startTyping();
  request(`http://${apiauth.plexpy_host}${apiauth.plexpy_baseurl}/api/v2?apikey=${apiauth.plexpy_apikey}&cmd=get_activity`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let info = JSON.parse(body);
      msg.channel.send(`There are currently ${info.response.data.stream_count} active streams`);

      if (info.response.data.stream_count > 0) {
        let i = 0;
        info.response.data.sessions.forEach(s => {
          console.log(s);
          msg.channel.send({
            "content": `Stream ${i} Info`,
            "embed": {
              "title": s.full_title,
              "description": s.summary,
              "color": 11360941,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": `Called by ${msg.author.username}`
              },
              "author": {
                "name": `Stream ${i}`
              },
              "fields": [
                {
                  "name": "Resolution",
                  "value": `${s.stream_video_width}x${s.stream_video_resolution}`,
                  "inline": true
                },
                {
                  "name": "Type",
                  "value": s.stream_audio_decision,
                  "inline": true
                },
                {
                  "name": "Player",
                  "value": s.product,
                  "inline": true
                }
              ]
            }
          });
          i++;
        })
      }
      msg.channel.stopTyping();
    }
  })
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['np'],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "nowplaying",
  description: "Pulls what's currently being played on the server",
  usage: "nowplaying"
};
