const Discord = require('discord.js');
module.exports = (MangaItem) =>
{
    let eD = MangaItem.data[0].attributes.endDate === null ? "Still running" : MangaItem.data[0].attributes.endDate;
    let v = MangaItem.data[0].attributes.volumeCount === null ? "No count registered" : MangaItem.data[0].attributes.volumeCount;
    let c = MangaItem.data[0].attributes.chapterCount === null ? "No count" : MangaItem.data[0].attributes.chapterCount;
    let o = MangaItem.data[0].attributes.synopsis === null ? "No description" : MangaItem.data[0].attributes.synopsis;
    let s = MangaItem.data[0].attributes.status === "finished" ? "Finished" : "Running";
    let e = new Discord.RichEmbed()
    .setTitle(MangaItem.data[0].attributes.canonicalTitle)
    .setDescription(`${o} ... https://kitsu.io/manga/${MangaItem.data[0].attributes.slug}`)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(`${MangaItem.data[0].attributes.posterImage.tiny}.jpg`)
    .setAuthor("Manga Information", `https://kitsu.io/manga/"${MangaItem.data[0].attributes.slug}`)
    .addField("Start Date", MangaItem.data[0].attributes.startDate, true)
    .addField("End Date", eD, true)
    .addField("Status", s, true)
    .addField("Volume Count", v, true)
    .addField("Avg. Rating", `${MangaItem.data[0].attributes.averageRating}/100`, true)
    .addField("Chapter Count", c, true)
    .addField("Serialization", MangaItem.data[0].attributes.serialization, true)
    .addField("Kitsu ID", MangaItem.data[0].id, true);
    return e;
};
