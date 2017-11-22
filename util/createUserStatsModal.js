const Discord = require('discord.js');
const durationFormat = require('./durationFormat');
module.exports = (userStats) => 
{
    console.log(userStats);
    userStats = JSON.parse(userStats);
    let e = new Discord.RichEmbed()
    .setColor(7221572)
    .setTimestamp()
    .setAuthor("Statistics");
    userStats.forEach(i => {
        e.addField(`Last ${i.query_days} Days`, `${durationFormat(i.total_time)} / ${i.total_plays} items`, true);
    });
    return e;
}