const apiauth = require('../apiauth.json');
const SonarrAPI = require('sonarr-api');
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

  message.channel.startTyping();
  message.channel.send("Starting...")
  .then(m => {
    if (!args[0]) {
      m.edit("ERR: No variables found. run `.help addtv`");
      return;
    }

    if (args[1]) {
      m.edit("Detected quality profile override.. Scanning for profileId");
      sonarr.get("profile").then(function (result) {
        let profile = result.find(q => q.name === args[1]);
        profileId = profile.id;
        m.edit("profileId found.")
        if (profileId === undefined) {
          m.edit("ERR: Profile not found.");
          message.channel.stopTyping();
          return;
        }
      });
    }

    if (args[2]) {
      m.edit("Root path override detected.");
      rootPath = args[2];
    }

    m.edit("Looking up TV Show information.");
    sonarr.get("series/lookup", { "term": "tvdb:" + args[0] }).then(function (result) {
      if (result.length === 0) {
        m.edit("ERR: Unable to pull show matching that ID");
        message.channel.stopTyping();
        return;
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
      m.edit("Adding to Sonarr....");
      sonarr.post("series", data).then(function (postResult) {
        let tvShow = postResult;
        let banner = result[0].images.find(o => o.coverType == "banner");
        let bannerUrl = banner.url;
        let dateFirstAired = new Date(postResult.firstAired);
        let firstAirDateStr = dateFirstAired.getFullYear() + "-" + dateFirstAired.getMonth() + "-" + dateFirstAired.getDate()      
        m.edit(
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
        m.edit("ERR: Sorry, an unknown error occured.")
      });  
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
