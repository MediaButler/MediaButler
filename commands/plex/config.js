const getPlexClient = require('../../util/plex/getPlexClient');
const getSettnigs = require('../../util/plex/getPlexSettings');
const setPlexUrl = require('../../util/plex/setPlexUrl');
exports.run = (bot, msg, args = []) => {
  let plexurl;
  getSettnigs(msg.guild.id)
    .then((settings) => {
      if (settings.plexurl != '') plexurl = settings.plexurl;
    });
  if (args != '') plexurl = args;
  if (plexurl == '') { msg.channel.send('ERR: No Plex URL defined'); return; }
  console.log(`trying to set url to ${plexurl}`);
  setPlexUrl(msg.guild.id, args[0]).then(() => {
    console.log('set plex url in db');
    plexurl = args; 
    getPlexClient(msg.guild.id)
      .then((client) => {
        console.log(client);
        msg.channel.send('Plex sucessfully configured');
      }).catch((err) => {
        console.log(err);
        if (err == 'updTokenSuccessful') msg.channel.send('Sucessfully processed plex token. Please run command again and we will work.');
        if (typeof(err) == 'object') msg.channel.send(`Please go to https://plex.tv/pin and authenticate this code: ${err.code}. Run plex config again once authenticated.`);
      });
  });
};
exports.help = {
  name: 'config',
  description: 'Configures Plex for use',
  usage: 'plex config <url>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};