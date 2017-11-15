const apiauth = require('../apiauth.json');
const SonarrAPI = require('../node_modules/sonarr-api/lib/api.js');
const sonarr = new SonarrAPI({
  hostname: apiauth.sonarr_host.split(":")[0],
  apiKey: apiauth.sonarr_apikey,
  port: apiauth.sonarr_host.split(":")[1],
  urlBase: apiauth.sonarr_baseurl
});

exports.run = (client, message, args, perms) => {
  let tvdbId;
  let showTitle;
  let rootFolderPath;
  let profileId = apiauth.sonarr_defaultProfileId;
  let rootPath = apiauth.sonarr_defaultRootPath;

  if (!args[0]) {
    message.channel.send("No variables found. run `.help addtv`");
    return;
  }

  if (args[1]) {
    sonarr.get("profile").then(function (result) {
      let profile = result.find(q => q.name === args[1]);
      profileId = profile.id;
      if (profileId === undefined) {
        message.channel.send("Profile not found.");
        return;
      }
    });
  }

  if (args[2]) {
    rootPath = args[2];
  }

  message.channel.startTyping();
  
  sonarr.get("series/lookup", { "term": "tvdb:" + args[0] }).then(function (result) {
    if (result.length === 0) {
      message.chanel.send("Unable to pull show matching that ID");
    }

    let data = 
    {
      "tvdbId": result[0].tvdbId,
      "title": result[0].title,
      "qualityProfileId": profileId,
      "titleSlug": result[0].titleSlug,
      "images": result[0].images,
      "seasons": result[0].seasons,
      "monitored": true,
      "seasonFolder": true,
      "rootFolderPath": rootPath
    };

    sonarr.post("series", data).then(function (postResult) {
      let tvShow = postResult;
      let banner = result[0].images.find(o => o.coverType == "banner");
      let bannerUrl = banner.url;
      let dateFirstAired = new Date(postResult.firstAired);
      message.channel.send(
        {
          "embed": 
          {
            "title": tvShow.title,
            "description": tvShow.overview,
            "color": 13619085,
            "timestamp": new Date(),
            "footer": {
              "icon_url": message.author.avatarURL,
              "text": "Called by " + message.author.username
            },
            "image": {
              "url": banner.url
            },
            "author": {
              "name": "Sucessfully added to Sonarr",
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
      );
      message.channel.stopTyping();      
    }, function (err) {
      message.channel.send("Sorry, an unknown error occured, please check Sonarr logs")
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'addtv',
  description: 'Adds a TV Show directly to Sonarr',
  usage: 'addtv <tvdbId> [qualityProfile] [rootPath]'
};
