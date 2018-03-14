const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
  const [source, url, apikey, defprofile, defroot] = args;
  if (!source || !url || !apikey || !defprofile || !defroot) { msg.channel.send(`ERR: Not all configuration provided \nUsage: ${msg.guild.settings.prefix}${this.help.usage}`); return; }
  switch (source) {
    case 'radarr':
      msg.channel.send('Configuring Radarr')
        .then((m) => {
          msg.guild.settings.radarr.url = url;
          msg.guild.settings.radarr.apikey = apikey;
          msg.guild.settings.radarr.defaultProfile = defprofile;
          msg.guild.settings.radarr.defaultRootPath = defroot;
          saveDb(bot);
          m.edit('Configuration Sucessfully Updated. Testing...');
          const getMovie = require('../../util/radarr/getMovie');
          getMovie(msg.guild, 'tt0078748')
            .then(() => {
              m.edit('Configuration sucessful. Radarr is now configured');
            }).catch((err) => { m.edit(`ERR: ${err}`); });
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