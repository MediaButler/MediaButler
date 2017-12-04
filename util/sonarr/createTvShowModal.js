const Discord = require('discord.js');
module.exports = (tvShowItem) =>
{
  const r = tvShowItem.imdbRating === 'N/A' ? 'No rating' : `${tvShowItem.imdbRating}/10`;
  const v = tvShowItem.imdbRating === 'N/A' ? '' : ` (${tvShowItem.imdbVotes} votes)`;
  const g = tvShowItem.Genre.length > 24 ? `${tvShowItem.Genre.substring(0, 22)}...` : tvShowItem.Genre;
  const e = new Discord.RichEmbed()
    .setTitle(tvShowItem.Title)
    .setDescription(tvShowItem.Plot)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(tvShowItem.Poster)
    .setAuthor('TV Show Information', 'https://www.thetvdb.com/?tab=series&id=')
    .addField('Year', tvShowItem.Year, true)
    .addField('Rated', tvShowItem.Rated, true)
    .addField('Release Date', tvShowItem.Released, true)
    .addField('Genre', g, true)
    .addField('Runtime', tvShowItem.Runtime, true)
    .addField('Rating', `${r}${v}`, true)
    .addField('IMDb ID', tvShowItem.imdbID, true);
  return e;
};