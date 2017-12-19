const uuid = require('uuid-v4');
module.exports = (guild) => 
{
  const p = new Promise((resolve, reject) => 
  {
    const myUuid = uuid();
    guild.settings = require('../config/default.json');
    resolve();
  });
  return p;
};
