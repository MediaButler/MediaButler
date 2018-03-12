//const getApi = require('./getApi');
var request = require('request');

module.exports = (guild) => {
  const p = new Promise((resolve, reject) => 
  {
      if (!guild.settings.emby.url) reject('Emby URL not set');
      if (!guild.settings.emby.api_key) reject('Emby Apikey not set');

    request({
          url: guild.settings.emby.url + "/Sessions?api_key=" + guild.settings.emby.api_key,
          json: true, 
          method: "GET"
      },
      function(error, response, body){
          if (typeof error !== undefined && error !== null) {
            reject(error);
          } else{
            var result = [];
            for (var i = 0, len = body.length; i < len; i++) {
                if (typeof body[i].NowPlayingItem !== 'undefined') {
                  result.push(body[i]);
                }
            }
            resolve(result);
          }
      });
  });
  return p;
};