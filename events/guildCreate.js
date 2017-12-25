const saveDb = require('../util/db/saveDb');
const uuid = require('uuid-v4');
module.exports = (guild) => {
  guild.settings = require('../config/default.json');
  guild.settings.uuidv4 = uuid();  
  saveDb(guild.client);
  guild.owner.send(`Hello, I am ${guild.client.user.username} your personal Media Butler!\nTo get going we are going to need to set a few settings, please look at the set command and our github wiki to get going`);        
};