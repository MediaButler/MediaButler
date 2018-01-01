const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
  const [source, url, apikey] = args;
  if (!source || !url || !apikey) { msg.channel.send('ERR: Not all configuration provided'); return; }
  switch (source) {
    case 'tautulli':
      msg.channel.send('Configuring Tautulli')
        .then((m) => {
          msg.guild.settings.tautulli.url = url;
          msg.guild.settings.tautulli.apikey = apikey;
          saveDb(bot);
          m.edit('Configuration Sucessfully Updated. Testing...');
          const getNowPlaying = require('../../util/tautulli/getNowPlaying');
          getNowPlaying(msg.guild)
            .then(() => {
              m.edit('Configuration sucessful. Tautulli is now configured');
            }).catch((err) => { m.edit(`ERR: ${err}`); console.log(err); });
        }).catch((err) => { console.log(err); });
      break;
    
    default:
      msg.channel.send('Sorry. Unable to determine configuration. Please try help');
      break;
  }
};
exports.help = {
  name: 'config',
  description: 'Configures Statistics Engine to use',
  usage: 'stats config <engine> <url> <apikey>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};