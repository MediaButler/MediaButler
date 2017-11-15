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
  const query = args.join(" ");

  sonarr.get("series/lookup", { "term": args.join(" ") }).then(function (result) {
    const url = 'http://www.omdbapi.com/?t=' + query + '&apikey=5af02350&type=series';
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        let info = JSON.parse(body);
        if (result.length === 0) {
          msg.chanel.send("Unable to pull show matching that ID");
        }

        let tvShow = result[0];
        let banner = tvShow.images.find(o => o.coverType == 'banner');
        let firstAirDate = new Date(tvShow.firstAired);
        let firstAirDateStr = firstAirDate.getFullYear() + "-" + firstAirDate.getMonth() + "-" + firstAirDate.getDate()
        msg.channel.send(
          {
            "embed":
            {
              "title": tvShow.title,
              "description": tvShow.overview,
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
                "url": "https://www.thetvdb.com/?tab=series&id=" + tvShow.tvdbId,
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              "fields":
              [
                {
                  "name": "Network",
                  "value": tvShow.network,
                  "inline": true
                },
                {
                  "name": "First Aired",
                  "value": firstAirDateStr,
                  "inline": true
                },
                {
                  "name": "Airs on",
                  "value": tvShow.airTime,
                  "inline": true
                },
                {
                  "name": "Genres",
                  "value": tvShow.genres.join(', '),
                  "inline": true
                },
                {
                  "name": "Status",
                  "value": tvShow.status,
                  "inline": true
                },
                {
                  "name": "Rating",
                  "value": tvShow.ratings.value + " (" + tvShow.ratings.votes + " votes)",
                  "inline": true
                },
                {
                  "name": "Runtime",
                  "value": tvShow.runtime + " mins",
                  "inline": true
                },
                {
                  "name": "TVDb ID",
                  "value": tvShow.tvdbId,
                  "inline": true
                }
              ]
            }
          }
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
