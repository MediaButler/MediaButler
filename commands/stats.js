const apiauth = require('../apiauth.json');
const request = require('request');

exports.run = (bot, msg, args, perms = []) => {
  const max = 4462;
  if (!args[0])
  {
    msg.channel.send('No user selected.');
  } else {
    msg.channel.startTyping();
    var url = 'http://' + apiauth.plexpy_host + apiauth.plexpy_baseurl + '/api/v2?apikey=' + apiauth.plexpy_apikey + '&cmd=get_user_watch_time_stats&user_id=' + args[0];
console.log(url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
console.log(info.response.data);
	info.response.data.forEach(i =>
        {
          msg.channel.send('Days: ' + i.query_days + ', Plays: ' + i.total_plays + ', Time: ' + durationFormat(i.total_time));
        });

      } else { msg.channel.send('error: ' + error); } // if(!error
    msg.channel.stopTyping();
    });
  }
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name : "stats",
  description: "Gets watched stats about <user>",
  usage: "stats <user>"
};

function durationFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + "h ";
    }
    if (mins > 0) {
        ret += "" + mins + "m ";
    }
    if (secs > 0) {
        ret += "" + secs + "s ";
    }
    return ret;
}
