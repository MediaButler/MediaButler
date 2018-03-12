const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
  const [source, url, apikey, defprofile, defroot] = args;
  if (!source || !url || !apikey || !defprofile || !defroot) { msg.channel.send(`ERR: Not all configuration provided\nUsage: ${msg.guild.settings.prefix}${this.help.usage}`); return; }
  switch (source) {
    case 'sonarr':
      msg.channel.send('Configuring Sonarr')
        .then((m) => {
          msg.guild.settings.sonarr.url = url;
          msg.guild.settings.sonarr.apikey = apikey;
          msg.guild.settings.sonarr.defaultProfile = defprofile;
          msg.guild.settings.sonarr.defaultRootPath = defroot;
          saveDb(bot);
          m.edit('Configuration Sucessfully Updated. Testing...');
          const getShow = require('../../util/sonarr/getTvShow');
          getShow(msg.guild, '257655')
            .then(() => {
              m.edit('Configuration sucessful. Sonarr is now configured');
            }).catch((err) => { m.edit(`ERR: ${err}`); console.log(err); });
        }).catch((err) => { console.log(err); });
      break;
  
    case 'sickrage':
      msg.channel.send('SickRage not available... yet');
      break;
  
    default:
      msg.channel.send('Sorry. Unable to determine configuration. Please try help');
      break;
  }
};
exports.help = {
  name: 'config',
  description: 'Configures TV Show Engine to use',
  usage: 'tv config <engine> <url> <apikey> <defaultProfileId> <defaultRootPath>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};