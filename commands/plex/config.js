const getApi = require('../../util/plex/getApi');
const setPlexUrl = require('../../util/plex/setPlexUrl');

exports.run = (bot, msg, args = []) => {
  let plexurl;
  if (msg.guild.settings.plex.url) plexurl = msg.guild.settings.plex.url ;
  if (args != '') plexurl = args;
  if (plexurl == '') { msg.channel.send('ERR: No Plex URL defined'); return; }
  setPlexUrl(msg.guild, plexurl).then(() => {
    plexurl = args; 
    getApi(msg.guild)
      .then(() => {
        msg.channel.send('Plex sucessfully configured');
      }).catch((err) => {
        if (err == 'updTokenSuccessful') msg.channel.send('Sucessfully processed plex token. Please run command again and we will work.');
        if (typeof(err) == 'object') msg.channel.send(`Please go to https://plex.tv/pin and authenticate this code: ${err.code}. Run plex config again once authenticated.`);
      });
  });
};
exports.help = {
  name: 'config',
  description: 'Configures Plex for use',
  usage: 'plex config <plexUrl>'
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};