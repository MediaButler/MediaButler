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

      const albumLength = info.results.albummatches.album;

      function mbidInQuery(s, word){
        return new RegExp( '\\b' + word + '\\b', 'i').test(s);
      }

      if (mbidInQuery(query, 'mbid')) {
        let urlInfo = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=cd564d2f0dd91dd49b4e1d655dffd02c&mbid=${args[1]}&format=json`;
        request(urlInfo, function (error, res, body) {
          if (!error) {
            let info = JSON.parse(body);

            let overview = info.album.wiki.content === null ? "No description" : info.album.wiki.content;
            let trimmedOverview = overview.substring(0, 200);

            msg.channel.send({
              "embed": {
                "title": `${info.album.artist} - ${info.album.name}`,
                "description": `${trimmedOverview}...`,
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
                    "name": "Genre",
                    "value": info.album.tags.tag[0].name,
                    "inline": true
                  }
                ]
              }
            })
          }
        });
       return;
      }

      if (albumLength.length !== 1) {
        msg.channel.send({
          "embed": {
            "title": 'We need your help with this',
            "description": `We have found multiple albums containing the word ${query}. These are the first 5 albums coming up in the MB database. Need a more specific search? Try adding the artist name.\n\n For album info, use "!album mbid '<'musicbrainz ID'>'" \n Example: \n !album mbid 37e4a79b-723f-4501-94aa-775c609b7fdf`,
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
                "name": `1) ${info.results.albummatches.album[0].artist} - ${info.results.albummatches.album[0].name}`,
                "value": `MUSICBRAINZ ID: ${info.results.albummatches.album[0].mbid}`,
                "inline": false
              },
              {
                "name": `2) ${info.results.albummatches.album[1].artist} - ${info.results.albummatches.album[1].name}`,
                "value": `MUSICBRAINZ ID: ${info.results.albummatches.album[1].mbid}`,
                "inline": false
              },
              {
                "name": `3) ${info.results.albummatches.album[2].artist} - ${info.results.albummatches.album[2].name}`,
                "value": `MUSICBRAINZ ID: ${info.results.albummatches.album[2].mbid}`,
                "inline": false
              },
              {
                "name": `4) ${info.results.albummatches.album[3].artist} - ${info.results.albummatches.album[3].name}`,
                "value": `MUSICBRAINZ ID: ${info.results.albummatches.album[3].mbid}`,
                "inline": false
              },
              {
                "name": `5) ${info.results.albummatches.album[4].artist} - ${info.results.albummatches.album[4].name}`,
                "value": `MUSICBRAINZ ID: ${info.results.albummatches.album[4].mbid}`,
                "inline": false
              }
            ]
          }
        });
      }
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
