const request = require('request');

exports.run = (bot, msg, args = []) => {
  let query = args.join(" ");

  if (!args[0]) {
    msg.channel.send('stop screwing up');
  }
  let urlSearch = `http://ws.audioscrobbler.com//2.0/?method=album.search&album=${query}&api_key=cd564d2f0dd91dd49b4e1d655dffd02c&format=json`;
  request(urlSearch, function (error, res2, body) {
    if (!error) {
      let info = JSON.parse(body);

      console.log(info);
      msg.channel.send({
        "embed": {
          "title": 'We need your help with this',
          "description": `We have found multiple albums containing the word ${query}. These are the 5 first coming up in the MB database. Need a more specific search? Try adding the artist name.`,
          "color": 11360941,
          "timestamp": new Date(),
          "footer": {
            "icon_url": msg.author.avatarURL,
            "text": `Called by ${msg.author.username}`
          },
          "author": {
            "name": "Album Information",
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          "fields": [
            {
              "name": `${info.results.albummatches.album[0].artist} - ${info.results.albummatches.album[0].name}`,
              "value": info.results.albummatches.album[0].mbid,
              "inline": false
            },
            {
              "name": `${info.results.albummatches.album[1].artist} - ${info.results.albummatches.album[1].name}`,
              "value": info.results.albummatches.album[1].mbid,
              "inline": false
            },
            {
              "name": `${info.results.albummatches.album[2].artist} - ${info.results.albummatches.album[2].name}`,
              "value": info.results.albummatches.album[2].mbid,
              "inline": false
            },
            {
              "name": `${info.results.albummatches.album[3].artist} - ${info.results.albummatches.album[3].name}`,
              "value": info.results.albummatches.album[3].mbid,
              "inline": false
            },
            {
              "name": `${info.results.albummatches.album[4].artist} - ${info.results.albummatches.album[4].name}`,
              "value": info.results.albummatches.album[4].mbid,
              "inline": false
            },

          ]
        }
      })
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
  name: "album",
  description: "Pulls info for an album",
  usage: "album <artist name>"
};
