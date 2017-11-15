const apiauth = require('../apiauth.json');
const books = require('google-books-search');

exports.run = (bot, msg, args = []) => {
  const max = 4462;
  const query = args.join(" ");

  books.search(query, (error, res) => {
    if (res == undefined) {
      msg.channel.send("No results in the Goodreads database. Check the book name.")
    }
    else {

      const thumbnail = res[0].thumbnail === undefined ? "http://via.placeholder.com/200x300" : res[0].thumbnail;
      const overview = res[0].description === null ? "No description" : res[0].description;
      let trimmedOverview = overview.substring(0, 200);

      console.log(res[0]);
      msg.channel.send({
            "embed":
            {
              "title": res[0].title,
               "description": trimmedOverview + "... https://books.google.nl/books/about/" + res[0].title + ".html?id=" + res[0].id + "&redir_esc=y",
              "color": 13619085,
              "timestamp": new Date(),
              "footer": {
                "icon_url": msg.author.avatarURL,
                "text": "Called by " + msg.author.username
              },
              "thumbnail": {
                "url": thumbnail
              },
              "author": {
                "name": "Book Information",
                "url": "https://books.google.nl/books/about/" + res[0].title + ".html?id=" + res[0].id + "&redir_esc=y",
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              "fields":
             [
              {
                "name": "Release date",
                "value": res[0].publishedDate,
                "inline": true
              },
              {
                "name": "Author",
                "value": res[0].authors[0],
                "inline": true
              },
              {
                "name": "Publisher",
                "value": res[0].publisher,
                "inline": true
              },
              {
                "name": "Rating",
                "value": res[0].averageRating + "/5",
                "inline": true
              },
              {
                "name": "Category",
                "value": res[0].categories[0],
                "inline": true
              },
              {
                "name": "Page count",
                "value": res[0].pageCount,
                "inline": true
              },
              {
                "name": "Googlebooks ID",
                "value": res[0].id,
                "inline": true
              },
              {
                "name": "ISBN13",
                "value": res[0].industryIdentifiers[0].identifier,
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
