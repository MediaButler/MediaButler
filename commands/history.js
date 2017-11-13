const apiauth = require('../apiauth.json');
const request = require('request');

exports.run = (bot, msg, params = []) => {
  const max = 4462;
  var url;
  if (params[1] == undefined) {
    url = 'http://' + apiauth.plexpy_host + apiauth.plexpy_baseurl + '/api/v2?apikey=' + apiauth.plexpy_apikey + '&cmd=get_history&length=5&user=' + params[0];
  } else {
    url = 'http://' + apiauth.plexpy_host + apiauth.plexpy_baseurl + '/api/v2?apikey=' + apiauth.plexpy_apikey + '&cmd=get_history&length=' + params[1] + '&user=' + params[0];
  }
  msg.channel.startTyping();
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      msg.channel.send({
            "embed": {
              "color": 11360941,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": "Called by " + msg.author.username
              },
              "author": {
                "name": "Stats for " + params[0]
              },
              "fields": [
                {
                  "name": "Total Duration",
                  "value": info.response.data.total_duration,
                  "inline": true
                },
                {
                  "name": "Shown Duration",
                  "value": info.response.data.filter_duration,
                  "inline": true
                }
              ]
            }
          }
      );
      if (info.response.data.data.length > 0) {
        info.response.data.data.forEach(f => {
          msg.channel.send(
              {
                "embed": {
                  "title": f.full_title,
                  "color": 11360941,
                  "author": {
                    "name": "History Item"
                  },
                  "fields": [
                    {
                      "name": "Watched at",
                      "value": timeConverter(f.started),
                      "inline": true
                    },
                    {
                      "name": "Type",
                      "value": f.transcode_decision,
                      "inline": true
                    },
                    {
                      "name": "Player",
                      "value": f.platform + " " + f.player,
                      "inline": true
                    },
                    {
                      "name": "Watched",
                      "value": f.percent_complete + "%",
                      "inline": true
                    }
                  ]
                }
              })
        })
      } else {
        msg.channel.send("Sorry, no results found");
      }
    }
    msg.channel.stopTyping();
  });
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "history",
  description: "Pulls the <user>'s last [limit] history items",
  usage: "history <user> [limit]"
};

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
