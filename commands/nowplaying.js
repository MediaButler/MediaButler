const getSettings = require('../services/getSettings');
const request = require('request');
exports.run = (bot, msg, params = []) => {
  const max = 4462;
  getSettings(msg.guild.id)
  .then((settings) => {
    settings = JSON.parse(settings);
    let plexpyHost = settings.find(x => x.setting == "plexpy.host");
    let plexpyBaseurl = settings.find(x => x.setting == "plexpy.baseurl");
    let plexpyApikey = settings.find(x => x.setting == "plexpy.apikey");

    let url = `http://${plexpyHost.value}${plexpyBaseurl.value}/api/v2?apikey=${plexpyApikey.value}&cmd=get_activity`;
    msg.channel.startTyping();
    msg.channel.send("Starting...")
        .then(m => {
          m.edit("Querying PlexPy for Information...");
          request(url, function (error, response, body) {
            if (error && response.statusCode !== 200) {
              m.edit("ERR: Unable to retrieve data from PlexPy.");
              return;
            }
            let info = JSON.parse(body);
            if (info === undefined) {
              m.edit("ERR: Unable to parse information from PlexPy");
              return;
            }

            m.edit(`There are currently ${info.response.data.stream_count} active streams`);
            if (info.response.data.stream_count > 0) {
              let i = 0;
              info.response.data.sessions.forEach(s => {
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
          });
        });
    msg.channel.stopTyping();
  });
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
