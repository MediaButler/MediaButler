const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid-v4');
const guildCreate = require('../util/discordCreateGuild');
module.exports = (guild) => {
    guildCreate(guild.id)
    .then(() => {
        guild.owner.send(`Hello, I am ${guild.client.user.username} your personal Media Butler!\nTo get going we are going to need to set a few settings, please look at the set command and our github wiki to get going`);        
    }).catch((err) => { console.log(`ERR: Unable to setup guild for ${guild.id}`); });
};