const getApi = require('../../util/plex/getApi');
const setPlexUrl = require('../../util/plex/setPlexUrl');
const getPin = require('../../util/plex/getPin');
const getAuthToken = require('../../util/plex/getAuthToken');
const saveDb = require('../../util/db/saveDb');
const getUser = require('../../util/db/getUser');
const getApiUser = require('../../util/plex/getApiUser');
const getPinUser = require('../../util/plex/getPinUser');
const getAuthTokenUser = require('../../util/plex/getAuthTokenUser');
const saveUser = require('../../util/db/saveUser');

exports.run = (bot, msg, args = []) => {
  if (msg.channel.type == 'dm') {
    console.log('plex config in dm called');
    console.log(msg);
    if (!msg.author.settings) getUser(msg.author).then((set) => {
      msg.author.settings = set;
      if (args[0] != '') { msg.author.settings.plex.url = args; saveUser(msg.author); }
      if (msg.author.settings.plex.url == '') { msg.author.send('ERR: No Plex URL defined'); return; }

      getApiUser(msg.author).then((d) => {
        console.log('got api user');
        if (d.authToken == undefined && msg.author.settings.plex.pinToken == undefined) {
          console.log('make new pin');
          getPinUser(msg.author).then((pin) => {
            msg.author.settings.plex.pinToken = pin;
            saveUser(msg.author);
            msg.author.send(`Please go to https://plex.tv/pin and authenticate this code: ${pin.code}. Run plex config again once authenticated.`);
          });
          return;
        }
        if (d.authToken == undefined && msg.author.settings.plex.pinToken != undefined) {
          console.log('get token');
          getAuthTokenUser(msg.author).then((token) => {
            msg.author.settings.plex.token = token;
            saveUser(msg.author);
            msg.author.send('Sucessfully processed Plex token. Testing...').then((m) => {
              const testConnection = require('../../util/plex/testConnection');
              testConnection(d).then((r) => {
                m.edit('Sucessfully configured Plex.');
              });
            });
          });
        }
        if (d.authToken != undefined) {
          console.log('test token');
          msg.author.send('Testing Plex Connection').then((m) => {
            const testConnection = require('../../util/plex/testConnection');
            testConnection(d).then((r) => {
              m.edit('Sucessfully configured Plex.');
            });
          });
        }
      });
    });
  } else {
    let plexurl = [];
    if (msg.guild.settings.plex.url) plexurl[0] = msg.guild.settings.plex.url;
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
  }
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