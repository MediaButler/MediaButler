//const getApi = require('./getApi');
var request = require('request');

module.exports = (guild, stream) => {
  const p = new Promise((resolve, reject) => 
  {
      if (!guild.settings.emby.url) reject('Emby URL not set');
      if (!guild.settings.emby.api_key) reject('Emby Apikey not set');

    request({
          url: guild.settings.emby.url + "/Sessions/" + stream.Id + "/Playing/Stop?api_key=" + guild.settings.emby.api_key,
          json: stream, 
          method: "POST"
      },
      function(error, response, body){
          if (typeof error !== undefined && error !== null) {
            reject(error);
          } else{
            resolve();
          }
      });
  });
  return p;
};