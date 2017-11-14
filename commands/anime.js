const request = require('request');

exports.run = (bot, msg, args = []) => {
  const max = 4462;
  const query = args.join(" ");
  if (!args[0]) {
    msg.channel.send('Dont forget to add an anime!');
  } else {
    const url = 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=' + query;
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        let info = JSON.parse(body);
        if (info.data[0] === undefined) {
          msg.channel.send('Cant find anime.')
        } else {

          const overview = info.data[0].attributes.synopsis === undefined ? "No description" : info.data[0].attributes.synopsis;

          let trimmedOverview = overview.substring(0, 550);

          msg.channel.send({
                "content": "As requested....",
                "embed": {
                  "title": info.data[0].attributes.titles.en,
                  "description": trimmedOverview + "... https://kitsu.io/anime/" + info.data[0].attributes.slug,
                  "color": 11360941,
                  "timestamp": new Date(),
                  "footer": {
                    "icon_url": msg.author.avatarURL,
                    "text": "Called by " + msg.author.username
                  },
                  "image": {
                    "url": info.data[0].attributes.coverImage.tiny,
                  },
                  "author": {
                    "name": info.data[0].attributes.titles.en,
                    "url": "https://kitsu.io/anime/" + info.data[0].attributes.slug,
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                  },
                  "fields": [
                    {
                      "name": "JP Title",
                      "value": info.data[0].attributes.titles.ja_jp,
                      "inline": true
                    },
                    {
                      "name": "First Aired",
                      "value": info.data[0].attributes.startDate,
                      "inline": true
                    },
                    {
                      "name": "Episode count",
                      "value": info.data[0].attributes.episodeCount,
                      "inline": true
                    },
                    {
                      "name": "Ranked",
                      "value": info.data[0].attributes.ratingRank,
                      "inline": true
                    },
                    {
                      "name": "Rating",
                      "value": info.data[0].attributes.averageRating + "/100",
                      "inline": true
                    },
                    {
                      "name": "Status",
                      "value": info.data[0].attributes.status,
                      "inline": true
                    },
                    {
                      "name": "Kitsu ID",
                      "value": info.data[0].id,
                      "inline": true
                    }
                  ]
                }
              }
          );
        } // if(!error
      }
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
  name: "anime",
  description: "Pulls info for an anime",
  usage: "anime <anime name>"
};
