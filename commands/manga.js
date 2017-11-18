const request = require('request');

exports.run = (bot, msg, args = []) => {
  let max = 4462;
  let query = args.join(" ");
  if (!args[0]) {
    msg.channel.send('Dont forget to add an manga!');
  } else {
    let url = `https://kitsu.io/api/edge/manga?filter%5Btext%5D=${query}`;
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        let info = JSON.parse(body);
        if (info.data[0] === undefined) {
          msg.channel.send('Cant find manga.')
        } else {

          let endDatevar = info.data[0].attributes.endDate === null ? "Still running" : info.data[0].attributes.endDate;
          let volumeCountvar = info.data[0].attributes.volumeCount === null ? "No count registered" : info.data[0].attributes.volumeCount;
          let chapterCountvar = info.data[0].attributes.chapterCount === null ? "No count" : info.data[0].attributes.chapterCount;
          let overview = info.data[0].attributes.synopsis === null ? "No description" : info.data[0].attributes.synopsis;
          let status = info.data[0].attributes.status === "finished" ? "Finished" : "Running";
          let endDate = info.data[0].attributes.status === null ? "Still running" : "Running";

          let trimmedOverview = overview.substring(0, 200);

          msg.channel.send({
            "embed": {
              "title": info.data[0].attributes.canonicalTitle,
              "description": `${trimmedOverview} ... https://kitsu.io/manga/${info.data[0].attributes.slug}`,
              "color": 11360941,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": `Called by ${msg.author.username}`
              },
              "thumbnail": {
                "url": `${info.data[0].attributes.posterImage.tiny}.jpg`,
              },
              "author": {
                "name": "Manga Information",
                "url": `https://kitsu.io/manga/"${info.data[0].attributes.slug}`,
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              "fields": [
                {
                  "name": "Start Date",
                  "value": info.data[0].attributes.startDate,
                  "inline": true
                },
                {
                  "name": "End Date",
                  "value": endDatevar,
                  "inline": true
                },
                {
                  "name": "Status",
                  "value": status,
                  "inline": true
                },
                {
                  "name": "Volume Count",
                  "value": volumeCountvar,
                  "inline": true
                },
                {
                  "name": "Avg. Rating",
                  "value": `${info.data[0].attributes.averageRating}/100`,
                  "inline": true
                },
                {
                  "name": "Chapter Count",
                  "value": chapterCountvar,
                  "inline": true
                },
                {
                  "name": "Serialization",
                  "value": info.data[0].attributes.serialization,
                  "inline": true
                },
                {
                  "name": "Kitsu ID",
                  "value": info.data[0].id,
                  "inline": true
                },
              ]
            }
          });
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
  name: "manga",
  description: "Pulls info for a manga",
  usage: "manga <manga name>"
};
