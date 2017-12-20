const getApi = require('../../util/plex/getApi');
const setPlexUrl = require('../../util/plex/setPlexUrl');
const getPin = require('../../util/plex/getPin');
const getAuthToken = require('../../util/plex/getAuthToken');
const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
  let plexurl;
  if (msg.guild.settings.plex.url) plexurl = msg.guild.settings.plex.url ;
  if (args != '') plexurl = args;
  if (plexurl == '') { msg.channel.send('ERR: No Plex URL defined'); return; }
  setPlexUrl(msg.guild, plexurl[0]).then(() => {
    plexurl = args;
    getApi(msg.guild, false)
      .then((d) => {
        console.log(msg.guild.settings);
        console.log(d.authToken);
        console.log(msg.guild.settings.plex.pinToken);
        if (d.authToken == undefined && msg.guild.settings.plex.pinToken == undefined) { 
          getPin(msg.guild)
            .then((pinObj) => { 
              msg.guild.settings.plex.pinToken = pinObj;
              msg.channel.send(`Please go to https://plex.tv/pin and authenticate this code: ${pinObj.code}. Run plex config again once authenticated.`);
            }); 
          return;
        }

        if (d.authToken == undefined && msg.guild.settings.plex.pinToken != undefined) {
          getAuthToken(msg.guild)
            .then((token) => {
              console.log(token);
              msg.guild.settings.plex.token = token;
              msg.channel.send('Sucessfully processed plex token. Please run command again and we will work.');
              saveDb(bot);
            });
          return;
        }
        
        console.log(d);
        msg.channel.send('Plex sucessfully configured');
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