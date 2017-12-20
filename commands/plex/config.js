const getApi = require('../../util/plex/getApi');
const setPlexUrl = require('../../util/plex/setPlexUrl');
const getPin = require('../../util/plex/getPin');
const getAuthToken = require('../../util/plex/getAuthToken');
const saveDb = require('../../util/db/saveDb');
exports.run = (bot, msg, args = []) => {
  let plexurl = [];
  if (msg.guild.settings.plex.url) plexurl[0] = msg.guild.settings.plex.url ;
  if (args != '') plexurl = args;
  if (plexurl == []) { msg.channel.send('ERR: No Plex URL defined'); return; }
  setPlexUrl(msg.guild, plexurl[0]).then(() => {
    getApi(msg.guild)
      .then((d) => {
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
              msg.guild.settings.plex.token = token;
              saveDb(bot);              
              msg.channel.send('Sucessfully processed Plex token. Testing...')
                .then((m) => {
                  const getStreams = require('../../util/plex/getStreams');
                  getApi(msg.guild)
                    .then((plexClient) => {
                      getStreams(plexClient)
                        .then((res) => {
                          m.edit('Sucessfully configured Plex.');
                        });
                    });
                });
            });
          return;
        }
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