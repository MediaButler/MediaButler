const getConfig = require('../../util/organizr/getAutoConfig');
const getNowPlaying = require('../../util/tautulli/getNowPlaying');
const getShow = require('../../util/sonarr/getTvShow');
const getMovie = require('../../util/radarr/getMovie');
const getApi = require('../../util/plex/getApi');
const setPlexUrl = require('../../util/plex/setPlexUrl');
const getPin = require('../../util/plex/getPin');

exports.run = (client, message, args, perms) => {
  message.channel.send('Starting....');
  const url = args[0];
  const token = args[1];

  getConfig(url, token)
    .then(result => {
      message.channel.send('Received Configuration.... ');

      // Validation checks
      if (result.sonarr.url.slice(-1) == '/') result.sonarr.url = result.sonarr.url.substring(0, result.sonarr.url.length - 1);
      if (result.radarr.url.slice(-1) == '/') result.radarr.url = result.radarr.url.substring(0, result.radarr.url.length - 1);
      if (result.tautulli.url.slice(-1) == '/') result.tautulli.url = result.tautulli.url.substring(0, result.tautulli.url.length - 1);

      message.channel.send('Checking Tautulli...')
        .then((m) => {
          message.guild.settings.tautulli.url = result.tautulli.url;
          message.guild.settings.tautulli.apikey = result.tautulli.apikey;
          getNowPlaying(message.guild)
            .then(() => {
              m.edit('Configuration sucessful. Tautulli is now configured');
            }).catch((err) => { m.edit(`Unable to configure Tautulli: ${err}`); console.log(err); });
        });

      message.channel.send('Checking Sonarr...')
        .then((m) => {
          message.guild.settings.sonarr.url = result.sonarr.url;
          message.guild.settings.sonarr.apikey = result.sonarr.apikey;
          message.guild.settings.sonarr.defaultProfile = result.sonarr.defaultProfile;
          message.guild.settings.sonarr.defaultRootPath = result.sonarr.defaultRootPath;
          getShow(message.guild, '257655')
            .then((r) => {
              m.edit('Configuration sucessful. Sonarr is now configured');
            }).catch((err) => { m.edit(`Unable to configure Sonarr: ${err}`); console.log(err); });
        });

      message.channel.send('Checking Radarr...')
        .then((m) => {
          message.guild.settings.radarr.url = result.radarr.url;
          message.guild.settings.radarr.apikey = result.radarr.apikey;
          message.guild.settings.radarr.defaultProfile = result.radarr.defaultProfile;
          message.guild.settings.radarr.defaultRootPath = result.radarr.defaultRootPath;
          getMovie(message.guild, 'tt0078748')
            .then((ttt) => {
              m.edit('Configuration sucessful. Radarr is now configured');
            }).catch((err) => { m.edit(`Unable to configure Radarr: ${err}`); console.log(err); });
        });

      message.channel.send('Unable to configure Lidarr, Skipping...');

      message.guild.settings.synclounge.serverurl = result.synclounge.serverurl;
      message.guild.settings.synclounge.appurl = result.synclounge.appurl;
      message.channel.send('Set SyncLounge Configuration');

      message.channel.send('Checking Plex...')
        .then((m) => {
          setPlexUrl(message.guild, result.plex.url)
            .then(() => {
              getApi(message.guild)
                .then((d) => {
                  if (d.authToken == undefined && message.guild.settings.plex.pinToken == undefined) { 
                    getPin(message.guild)
                      .then((pinObj) => { 
                        message.guild.settings.plex.pinToken = pinObj;
                        m.edit(`Please go to https://plex.tv/pin and authenticate this code: ${pinObj.code}. Run \`${message.guild.settings.prefix}plex config\` once authenticated.`);
                      }); 
                  }
                });
            });
        });

    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'autoconf',
  description: 'Got Orgv2? Look here.',
  usage: 'bot autoconf <organizrUrl> <apiKey>'
};