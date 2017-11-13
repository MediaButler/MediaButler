const apiauth = require('../apiauth.json');
const tmdb = require('moviedb')(apiauth.themoviedbkey);
exports.run = (bot, msg, args = []) => {
  const max = 4462;

  tmdb.searchMovie({ query: args.join(" ") }, (err, res) => {
    if (res.results[0] == undefined) {
      msg.channel.send("No results in the TMDb database. Edit the film name or add it yourself over at themoviedb.org!")
    }
    else {
      tmdb.movieInfo({ id: res.results[0].id }, (err2, res2) => {
// move genre object array to list of names
        let i = 0;
        let g = [];
        while (i < res2.genres.length) {
          g.push(res2.genres[i].name)
          i++
        }

        msg.channel.send(
            {
              "message": res.results[0].title,
              "embed": {
                "title": res.results[0].title,
                "description": res.results[0].overview,
                "url": "https://www.themoviedb.org/movie/" + res2.id,
                "color": 11360941,
                "timestamp": new Date(),
                "footer": {
                  "icon_url": msg.author.avatarURL,
                  "text": "Called by " + msg.author.username
                },
                "image": {
                  "url": " http://image.tmdb.org/t/p/w185" + res2.poster_path
                },
                "author": {
                  "name": res2.original_title,
                  "url": "https://www.themoviedb.org/movie/" + res2.id,
                  "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "fields": [
                  {
                    "name": "Genres",
                    "value": g.join(", ")
                  },
                  {
                    "name": "Rating",
                    "value": res2.vote_average + " (" + res2.vote_count + " votes)",
                    "inline": true
                  },
                  {
                    "name": "Release Date",
                    "value": res2.release_date,
                    "inline": true
                  },
                  {
                    "name": "Studio",
                    "value": res2.production_companies[0].name,
                    "inline": true
                  },
                  {
                    "name": "Language",
                    "value": res2.original_language,
                    "inline": true
                  },
                  {
                    "name": "Status",
                    "value": res2.status,
                    "inline": true
                  },
                  {
                    "name": "TMDb ID",
                    "value": res2.id,
                    "inline": true
                  },
                  {
                    "name": "Tagline",
                    "value": res2.tagline,
                    "inline": false
                  }
                ]
              }
            })
      })
    }
  })
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['movie'],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "film",
  description: "Pulls info for a film",
  usage: "film <movie name>"
};
