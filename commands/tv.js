const request = require('request');
const apiauth = require('../apiauth.json');
const SonarrAPI = require('sonarr-api');
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
    const url = 'http://www.omdbapi.com/?t=' + args.join(" ") + '&apikey=5af02350&type=series';
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        let info = JSON.parse(body);

        const rating = info.imdbRating === "N/A" ? "No rating" : info.imdbRating + "/10";
        const votes = info.imdbRating === "N/A" ? "" : " (" + info.imdbVotes + " votes)";
        const genre = info.Genre.length > 24 ? info.Genre.substring(0, 22) + "..." : info.Genre

        msg.channel.send({
            "embed":
            {
              "title": info.Title,
              "description": info.Plot,
              "color": 13619085,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": "Called by " + msg.author.username
              },
              "thumbnail": {
                "url": info.Poster
              },
              "author": {
                "name": "TV Show Information",
                "url": "https://www.thetvdb.com/?tab=series&id=" + tvShow.tvdbId,
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              "fields":
         [
           {
             "name": "Year",
             "value": info.Year,
             "inline": true
           },
           {
             "name": "Rated",
             "value": info.Rated,
             "inline": true
           },
           {
             "name": "Release date",
             "value": info.Released,
             "inline": true
           },
           {
             "name": "Genre",
             "value": genre,
             "inline": true
           },
           {
             "name": "Runtime",
             "value": info.Runtime,
             "inline": true
           },
           {
             "name": "Rating",
             "value": rating + votes,
             "inline": true
           },
           {
             "name": "IMDb ID",
             "value": info.imdbID,
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
        )
      }
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
  name: "tv",
  description: "Pulls info for series or anime.",
  usage: "tv <show>"
};
