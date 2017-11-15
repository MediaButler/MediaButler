const request = require('request');
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
        let i = 0;
        let g = [];
        while (i < res2.genres.length) {
          g.push(res2.genres[i].name)
          i++
        }

        const url = 'http://www.omdbapi.com/?t=' + args.join(" ") + '&apikey=5af02350&type=movie';
        request(url, function (error, res3, body) {
          if (!error && res3.statusCode === 200) {
            let info = JSON.parse(body);

            const rating = info.imdbRating === "N/A" ? "No rating" : info.imdbRating + "/10";
            const votes = info.imdbRating === "N/A" ? "" : " (" + info.imdbVotes + " votes)";
            const genre = info.Genre.length > 24 ? info.Genre.substring(0, 23) + "..." : info.Genre

        msg.channel.send({
                 "embed":
                 {
                   "title": info.Title,
                   "description": info.Plot,
                   "color": 13619085,
                   "timestamp": new Date(),
                   "footer": {
                     "icon_url": msg.author.avatarURL,
                     "text": "Called by " + msg.author.username
                   },
                   "thumbnail": {
                     "url": info.Poster
                   },
                   "author": {
                     "name": "Movie Information",
                     "url": "https://www.themoviedb.org/movie/" + res2.id,
                     "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                   },
                   "fields":
                  [
                   {
                     "name": "Year",
                     "value": info.Year,
                     "inline": true
                   },
                   {
                     "name": "Rated",
                     "value": info.Rated,
                     "inline": true
                   },
                   {
                     "name": "Release date",
                     "value": info.Released,
                     "inline": true
                   },
                   {
                     "name": "Genre",
                     "value": genre,
                     "inline": true
                   },
                   {
                     "name": "Runtime",
                     "value": info.Runtime,
                     "inline": true
                   },
                   {
                     "name": "Rating",
                     "value": rating + votes,
                     "inline": true
                   },
                   {
                     "name": "IMDb ID",
                     "value": info.imdbID,
                     "inline": true
                   },
                   {
                     "name": "TMDb ID",
                     "value": res2.id,
                     "inline": true
                   }
                ]
              }
            })
          }
        });
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
