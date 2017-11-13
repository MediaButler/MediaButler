const apiauth = require('../apiauth.json');
var SonarrAPI = require('../node_modules/sonarr-api/lib/api.js');
var sonarr = new SonarrAPI({
  hostname: apiauth.sonarr_host.split(":")[0],
  apiKey: apiauth.sonarr_apikey,
  port: apiauth.sonarr_host.split(":")[1],
  urlBase: apiauth.sonarr_baseurl
});

exports.run = (client, message, args, perms) => {
  var tvdbId;
  var showTitle;
  var rootFolderPath;
  var profileId = apiauth.sonarr_defaultProfileid;
  var rootPath = apiauth.sonarr_defaultRootPath;

  if (!args[0]) {
    message.channel.send("No variables found. run `.help addtv`");
    return;
  }

  if (args[1]) {
    sonarr.get("profile").then(function (result) {
      let profile = result.find(q => q.name == args[1]);
      profileId = profile.id;
      if (profileId == undefined) {
        message.channel.send("Profile not found.");
        return;
      }
    });
  }

  if (args[2]) {
    rootPath = args[2];
  }

  sonarr.get("series/lookup", { "term": "tvdb:" + args[0]}).then(function (result) {
    console.log(result);
      // Rearrange data to look how Sonarr wants.
      let data = {
        "tvdbId": result.tvdbId,
        "title": result.title,
        "qualityProfileId": profileId,
        "titleSlug": result.titleSlug,
        "images": result.images,
        "seasons": result.seasons,
        "monitored": true,
        "seasonFolder": true,
        "rootFolderPath": rootPath
      };
      // Add show to sonarr
      sonarr.post("series", { data }).then(function (postResult){
        console.log(postResult);
        message.channel.send("I think we added it");
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
