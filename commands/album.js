const request = require('request');

exports.run = (bot, msg, args = []) => {
  let max = 4462;
  let query = args.join(" ");

  if (!args[0]) {
    msg.channel.send('stop screwing up');
  }
  let urlCorrection = `http://ws.audioscrobbler.com/2.0/?method=artist.getCorrection&artist=${query}&api_key=cd564d2f0dd91dd49b4e1d655dffd02c&format=json`;
  request(urlCorrection, function (error, res2, body) {
    if (!error) {
      let info = JSON.parse(body);
      let correctedArtist = info.corrections.correction.artist.name;
      let url = `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${correctedArtist}&api_key=cd564d2f0dd91dd49b4e1d655dffd02c&format=json`;
      request(url, function (error, res2, body) {
        if (!error) {
          let info = JSON.parse(body);

          let onTour = info.artist.onTour === "0" ? "No" : "Yes";
          let overview = info.artist.bio.content === null ? "No description" : info.artist.bio.content;
          let trimmedOverview = overview.substring(0, 200);

          msg.channel.send({
            "embed": {
              "title": info.artist.name,
              "description": `${trimmedOverview}...${info.artist.url}`,
              "color": 11360941,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": `Called by ${msg.author.username}`
              },
              "thumbnail": {
                "url": info.artist.image[2]['#text'],
              },
              "author": {
                "name": "Artist Information",
                "url": info.artist.url,
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              "fields": [
                {
                  "name": "Published",
                  "value": info.artist.bio.published,
                  "inline": true
                },
                {
                  "name": "Genre",
                  "value": `${info.artist.tags.tag[0].name}, ${info.artist.tags.tag[1].name}`,
                  "inline": true
                },
                {
                  "name": "LastFM listeners",
                  "value": info.artist.stats.listeners,
                  "inline": true
                },
                {
                  "name": "On tour",
                  "value": onTour,
                  "inline": true
                },
                {
                  "name": "Musicbrainz ID",
                  "value": info.artist.mbid,
                  "inline": false
                }
              ]
            }
          })
        }
      });
    }
  });
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "artist",
  description: "Pulls info for an artist",
  usage: "artist <artist name>"
};
