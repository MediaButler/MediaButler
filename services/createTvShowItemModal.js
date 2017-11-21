const Discord = require('discord.js');
module.exports = (tvShowItem) =>
{
    let r = info.imdbRating === "N/A" ? "No rating" : `${info.imdbRating}/10`;
    let v = info.imdbRating === "N/A" ? "" : ` (${info.imdbVotes} votes)`;
    let g = info.Genre.length > 24 ? `${info.Genre.substring(0, 22)}...` : info.Genre;
    let e = new Discord.RichEmbed()
    .setTitle(tvShowItem.Title)
    .setDescription(tvShowItem.Plot)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(tvShowItem.Poster)
    .setAuthor("TV Show Information", `https://www.thetvdb.com/?tab=series&id=`)
    .addField("Year", tvShowItem.Year, true)
    .addField("Rated", tvShowItem.Rated, true)
    .addField("Release Date", tvShowItem.Released, true)
    .addField("Genre", g, true)
    .addField("Runtime", tvShowItem.Runtime, true)
    .addField("Rating", `${r}${v}`, true)
    .addField("IMDb ID", tvShowItem.imdbID, true);
    return e;
}