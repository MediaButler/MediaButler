const Discord = require('discord.js');
module.exports = (movieItem) =>
{
    let r = movieItem.imdbRating === "N/A" ? "No rating" : `${movieItem.imdbRating}/10`;
    let v = movieItem.imdbRating === "N/A" ? "" : `(${movieItem.imdbVotes} votes)`;
    let g = movieItem.Genre.length > 24 ? `${movieItem.Genre.substring(0, 23)} ...}` : info.Genre;
    let e = new Discord.RichEmbed()
    .setTitle(movieItem.Title)
    .setDescription(movieItem.Plot)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(movieItem.Poster)
    .setAuthor("Movie Information", `https://www.thetvdb.com/?tab=series&id=`)
    .addField("Year", movieItem.Year, true)
    .addField("Rated", movieItem.Rated, true)
    .addField("Release date", movieItem.Released, true)
    .addField("Genre", g, true)
    .addField("Runtime", movieItem.Runtime, true)
    .addField("Rating", `${r} ${v}`, true)
    .addField("IMDb ID", movieItem.imdbID, true);
    return e;
};