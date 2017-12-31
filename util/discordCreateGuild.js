const uuid = require('uuid-v4');
const saveDb = require('./db/saveDb');
module.exports = (guild) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const myUuid = uuid();
    guild.settings = require('../config/default.json');
    guild.uuidv4 = myUuid;
    saveDb(guild.client);
    resolve();
  });
  return p;
};