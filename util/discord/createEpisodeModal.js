const Discord = require('discord.js');
module.exports = (episodeItem) =>
{
  const r = episodeItem.imdbRating === 'N/A' ? 'No rating' : `${episodeItem.imdbRating}/10`;
  const v = episodeItem.imdbRating === 'N/A' ? '' : ` (${episodeItem.imdbVotes} votes)`;
  const g = episodeItem.Genre.length > 24 ? `${episodeItem.Genre.substring(0, 22)}...` : episodeItem.Genre;
  const e = new Discord.RichEmbed()
    .setTitle(episodeItem.Title)
    .setDescription(episodeItem.Plot)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(episodeItem.Poster)
    .setAuthor('Episode Information', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1024px-IMDB_Logo_2016.svg.png', 'http://www.imdb.com/title/' + episodeItem.imdbID)
    .addField('Year', episodeItem.Year, true)
    .addField('Rated', episodeItem.Rated, true)
    .addField('Release Date', episodeItem.Released, true)
    .addField('Genre', g, true)
    .addField('Runtime', episodeItem.Runtime, true)
    .addField('Rating', `${r}${v}`, true)
    .addField('Rated', episodeItem.Rated, true)
    .addField('IMDb ID', episodeItem.imdbID, true);
  return e;
};