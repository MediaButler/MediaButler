const apiauth = require('../apiauth.json');
const SonarrAPI = require('../node_modules/sonarr-api/lib/api.js');
const sonarr = new SonarrAPI({
  hostname: apiauth.sonarr_host.split(":")[0],
  apiKey: apiauth.sonarr_apikey,
  port: apiauth.sonarr_host.split(":")[1],
  urlBase: apiauth.sonarr_baseurl
});

exports.run = (bot, msg, args = []) => {
  const max = 4462;

  sonarr.get("series/lookup", { "term": args.join(" ") }).then(function (result) {
    if (result.length === 0) {
      msg.chanel.send("Unable to pull show matching that ID");
    }

    let tvShow = result[0];
    let banner = tvShow.images.find(o => o.coverType == 'banner');
    console.log(banner);
    msg.channel.send(
      {
        "embed": 
        {
          "title": result[0].title,
          "description": result[0].overview,
          "color": 13619085,
          "timestamp": new Date(),
          "footer": {
            "icon_url": msg.author.avatarURL,
            "text": "Called by " + msg.author.username
          },
          "image": {
            "url": banner.url
          },
          "author": {
            "name": "TV Show Information",
            "url": "https://www.thetvdb.com/?tab=series&id=" + result[0].tvdbId,
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          "fields": 
          [
            {
              "name": "Network",
              "value": result[0].network,
              "inline": true
            },
            {
              "name": "First Aired",
              "value": result[0].firstAired,
              "inline": true
            },
            {
              "name": "Airs on",
              "value": result[0].airsDayOfWeek + " " + result[0].airsTime,
              "inline": true
            },
            {
              "name": "Genres",
              "value": result[0].genres.join(', '),
              "inline": true
            },
            {
              "name": "Status",
              "value": result[0].status,
              "inline": true
            },
            {
              "name": "Rating",
              "value": result[0].siteRating + " (" + result[0].siteRatingCount + " votes)",
              "inline": true
            },
            {
              "name": "Runtime",
              "value": result[0].runtime + " mins",
              "inline": true
            },
            {
              "name": "TVDb ID",
              "value": result[0].tvdbId,
              "inline": true
            }
          ]
        }
      }
    )
  });
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "tv",
  description: "Pulls info for a tv show.",
  usage: "tv <show>"
};
