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
  let qualityProfile;
  let rootFolderPath;

// Lookup id
// getQualityProfileId
// getRootFolderPath;
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
