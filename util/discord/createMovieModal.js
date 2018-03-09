const Discord = require('discord.js');
module.exports = (movieItem) =>
{
  const r = movieItem.imdbRating === 'N/A' ? 'No rating' : `${movieItem.imdbRating}/10`;
  const v = movieItem.imdbRating === 'N/A' ? '' : `(${movieItem.imdbVotes} votes)`;
  const g = movieItem.Genre.length > 24 ? `${movieItem.Genre.substring(0, 23)} ...}` : movieItem.Genre;
  const e = new Discord.RichEmbed()
    .setTitle(movieItem.Title)
    .setDescription(movieItem.Plot)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(movieItem.Poster)
    .setAuthor('Movie Information', 'https://www.icon2s.com/wp-content/uploads/2013/10/social-IMDb-Icon.png', 'http://www.imdb.com/title/' + movieItem.imdbID)
    .addField('Year', movieItem.Year, true)
    .addField('Rated', movieItem.Rated, true)
    .addField('Release date', movieItem.Released, true)
    .addField('Genre', g, true)
    .addField('Runtime', movieItem.Runtime, true)
    .addField('Rating', `${r} ${v}`, true)
    .addField('IMDb ID', movieItem.imdbID, true);
  return e;
};