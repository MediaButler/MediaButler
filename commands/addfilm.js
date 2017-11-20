const SonarrAPI = require('sonarr-api');
const getSettings = require('../services/getSettings');

exports.run = (client, msg, args, perms) => {
  getSettings(msg.guild.id)
  .then((settings) => {
    settings = JSON.parse(settings);
    const host = settings.find(x => x.setting == "radarr.host").value;
    const baseUrl = settings.find(x => x.setting == "radarr.baseurl").value;
    const apiKey = settings.find(x => x.setting == "radarr.apikey").value;
    const defaultProfileId = settings.find(x => x.setting == "radarr.defaultprofileid").value;
    const defaultRootPath = settings.find(x => x.setting == "radarr.defaultrootpath").value;

    if (host == null || baseUrl == null || apiKey == null)
    {
      msg.channel.send("Radarr settings not configured");
      return;
    }

    const radarr = new SonarrAPI({ hostname: host.split(":")[0], apiKey: apiKey, port: host.split(":")[1], urlBase: baseUrl });
    
    let profileId = defaultProfileId;
    let rootPath = defaultRootPath;

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