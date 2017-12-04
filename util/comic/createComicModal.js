const Discord = require('discord.js');
module.exports = (ComicItem) =>
{
  const i = ComicItem.results[0].count_of_issues === null ? 'No count registered' : ComicItem.results[0].count_of_issues;
  const o = ComicItem.results[0].description === null ? 'No description' : ComicItem.results[0].description;
  const t = o.substring(0, 200);
  const r = t.replace(/<(?:.|\n)*?>/gm, '');
  const e = new Discord.RichEmbed()
    .setTitle(ComicItem.results[0].name)
    .setDescription(`${r} ... ${ComicItem.results[0].site_detail_url}`)
    .setColor(13619085)
    .setTimestamp()
    .setThumbnail(ComicItem.results[0].image.thumb_url)
    .setAuthor('Volume Information', ComicItem.results[0].site_detail_url)
    .addField('Start Date', ComicItem.results[0].start_year, true)
    .addField('Issue Count', i, true)
    .addField('First Issue', ComicItem.results[0].first_issue.name, true)
    .addField('First Issue CVID', ComicItem.results[0].first_issue.id, true)
    .addField('Last Issue', ComicItem.results[0].last_issue.name, true)
    .addField('Last Issue CVID', ComicItem.results[0].last_issue.id, true)
    .addField('Comicvine ID', ComicItem.results[0].id, true);
  return e;
};
