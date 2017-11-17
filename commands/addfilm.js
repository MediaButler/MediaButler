const apiauth = require('../apiauth.json');
const SonarrAPI = require('../node_modules/sonarr-api/lib/api.js');
const sonarr = new SonarrAPI({
  hostname: apiauth.radarr_host.split(":")[0],
  apiKey: apiauth.radarr_apikey,
  port: apiauth.radarr_host.split(":")[1],
  urlBase: apiauth.radarr_baseurl
});

exports.run = (client, msg, args, perms) => {
  let profileId = apiauth.radarr_defaultProfileId;
  let rootPath = apiauth.radarr_defaultRootPath;

  if (!args[0]) {
    msg.channel.send("No variables found. run `.help addtv`");
    return;
  }

  if (args[1]) {
    sonarr.get("profile").then((result) => {
      let profile = result.find(q => q.name === args[1]);
      profileId = profile.id;
      if (profileId === undefined) {
        msg.channel.send("Profile not found.");
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
