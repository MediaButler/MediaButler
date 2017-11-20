const SonarrAPI = require('sonarr-api');
const getSettings = require('../services/getSettings');

exports.run = (client, msg, args, perms) => {
  getSettings(msg.guild.id)
  .then((settings) => {
    settings = JSON.parse(settings);
    let radarrHost = settings.find(x => x.setting == "radarr.host");
    let radarrBaseurl = settings.find(x => x.setting == "radarr.baseurl");
    let radarrApikey = settings.find(x => x.setting == "radarr.apikey");
    let radarrDefaultProfileId = settings.find(x => x.setting == "radarr.defaultprofileid");
    let radarrDefaultRootPath = settings.find(x => x.setting == "radarr.defaultrootpath");

    var sonarr = new SonarrAPI({
      hostname: radarrHost.value.split(":")[0],
      apiKey: radarrApikey.value,
      port: radarrHost.value.split(":")[1],
      urlBase: radarrBaseurl.value
    });
    
    let profileId = radarrDefaultProfileId.value;
    let rootPath = radarrDefaultRootPath.value;

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
  });
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