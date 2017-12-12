exports.run = (bot, msg, args = []) => {
  const [source, url, apikey, defprofile, defroot] = args;
  if (!source || !url || !apikey || !defprofile || !defroot) { msg.channel.send('ERR: Not all configuration provided'); return; }
  switch (source) {
    case 'radarr':
      msg.channel.send('Configuring Radarr')
        .then((m) => {
          const setConfig = require('../../util/radarr/setConfig');
          setConfig(msg.guild.id, url, apikey, defprofile, defroot)
            .then(() => {
              m.edit('Configuration Sucessfully Updated. Testing...');
              const getMovie = require('../../util/radarr/getMovie');
              getMovie(msg.guild.id, 'tt0078748')
                .then(() => {
                  m.edit('Configuration sucessful. Radarr is now configured');
                });
            });
        });
      break;

    case 'couchpotato':
      msg.channel.send('CouchPotato not available... yet');
      break;

    default:
      msg.channel.send('Sorry. Unable to determine configuration. Please try help');
      break;
  }
};
exports.help = {
  name: 'config',
  description: 'Configures Movie Engine to use',
  usage: 'movie config <engine> <url> <apikey> <defaultProfileId> <defaultRootPath>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};