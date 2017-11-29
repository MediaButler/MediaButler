const Discord = require('discord.js');
const durationFormat = require('../durationFormat');
module.exports = (userStats) => 
{
    let e = new Discord.RichEmbed()
    .setColor(7221572)
    .setTimestamp()
    .setAuthor("Statistics");
    userStats.data.forEach(i => {
        e.addField(`Last ${i.query_days} Days`, `${durationFormat(i.total_time)} / ${i.total_plays} items`, true);
    });
    return e;
}