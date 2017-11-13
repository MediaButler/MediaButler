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
  var qualityProfile;
  var rootFolderPath;
  var profileId = apiauth.sonarr_defaultProfileid;
  var rootPath = apiauth.sonarr_defaultRootPath;

  if (!args[0]) {
    message.channel.send("No variables found. run `.help addtv`");
  }

  if (args[1]) {
    sonarr.get("profile").then(function (result) {
      profileId - result.find(q => q.name == args[1]).id;
      if (profileId == undefined) {
        message.client.channel("Profile not found.");
      }
    });
  }

  if (args[2]) {
    rootPath = args[2];
  }

  sonarr.get("series/lookup", { "term": "tvdb:" + args[0]}).then(function (result) {
      // Add show to sonarr
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
