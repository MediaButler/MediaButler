const apiauth = require('../apiauth.json');
const TVDB = require('node-tvdb');
const tvdb = new TVDB(apiauth.thetvdbkey);

exports.run = (bot, msg, args = []) => {
  const max = 4462;

  tvdb.getSeriesByName(args.join(" "))
  .then(titleSearchResponse => {
    tvdb.getSeriesById(titleSearchResponse[0].id)
    .then(response => {
      msg.channel.send({
        "content": "As requested....",
        "embed": {
          "title": response.seriesName,
          "description": response.overview,
          "color": 13619085,
          "timestamp": new Date(),
          "footer": {
            "icon_url": msg.author.avatarURL,
            "text": "Called by " + msg.author.username
          },
          "image": {
            "url": "http://thetvdb.com/banners/" + response.banner
          },
          "author": {
            "name": response.seriesName,
            "url": "https://www.thetvdb.com/?tab=series&id=" + response.id,
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          "fields": [
            {
              "name": "Network",
              "value": response.network,
              "inline": true
            },
            {
              "name": "First Aired",
              "value": response.firstAired,
              "inline": true
            },
            {
              "name": "Airs on",
              "value": response.airsDayOfWeek + " " + response.airsTime,
              "inline": true
            },
            {
              "name": "Genres",
              "value": response.genre.join(', '),
              "inline": true
            },
            {
              "name": "Status",
              "value": response.status,
              "inline": true
            },
            {
              "name": "Rating",
              "value": response.siteRating + " (" + response.siteRatingCount + " votes)",
              "inline": true
            },
            {
              "name": "Runtime",
              "value": response.runtime + " mins",
              "inline": true
            },
            {
              "name": "TVDb ID",
              "value": response.id,
              "inline": true
            }
          ]
        }
      }
    )
  })
}).catch(error => { msg.channel.send("No results in the TVDB database. Edit the show name or add it yourself over at thetvdb.com!")})
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name : "tv",
  description: "Pulls info for a tv show.",
  usage: "tv <show>"
};
