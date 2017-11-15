const apiauth = require('../apiauth.json');
var SonarrAPI = require('sonarr-api');
var sonarr = new SonarrAPI({
  hostname: apiauth.radarr_host.split(":")[0],
  apiKey: apiauth.radarr_apikey,
  port: apiauth.radarr_host.split(":")[1],
  urlBase: apiauth.radarr_baseurl
});

exports.run = (client, message, args, perms) => {
    var profileId = apiauth.radarr_defaultProfileId;
    var rootPath = apiauth.radarr_defaultRootPath;

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


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'addfilm',
  description: 'Adds a Movie directly to Radarr',
  usage: 'addfilm <tmdbId> [qualityProfile] [rootPath]'
};
