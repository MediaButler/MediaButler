const apiauth = require('../apiauth.json');
const SimpleGoodreads = require('simple-goodreads');

exports.run = (bot, msg, args = []) => {
  const max = 4462;
  const goodreads = new SimpleGoodreads();
  const query = args.join(" ");

  goodreads.searchBook(query, (err, book) => {
    if (book.title == undefined) {
      msg.channel.send("No results in the Goodreads database. Check the book name.")
    }
    else {
      console.log(book);
      msg.channel.send({
            "embed":
            {
              "title": book.Title,
              // "description": book.Plot,
              "color": 13619085,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": "Called by " + msg.author.username
              },
              "thumbnail": {
                "url": book.image_url
              },
              "author": {
                "name": "Movie Information",
        //        "url": "https://www.themoviedb.org/movie/" + res2.id,
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              "fields":
             [
              {
                "name": "Year",
                "value": book.publication_year,
                "inline": true
              },
              {
                "name": "Author",
                "value": book.author,
                "inline": true
              },
              {
                "name": "Rating",
                "value": book.rating + "/5",
                "inline": true
              },
              {
                "name": "Goodreads ID",
                "value": book.id,
                "inline": true
              }
           ]
         }
      })
    }
  })
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['book'],
  permLevel: 0 // Permissions Required, higher is more power
};
exports.help = {
  name: "ebook",
  description: "Pulls info for a book",
  usage: "ebook <book name>"
};
