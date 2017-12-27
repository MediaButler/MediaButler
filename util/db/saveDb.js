const fs = require('fs');
const coreSettings = require(`${process.cwd()}/settings.json`);
module.exports = (client) =>  {
  client.guilds.forEach(guild => {
    const data = JSON.stringify(guild.settings, null, 2);  
    fs.writeFileSync(`${coreSettings['path']}/${guild.id}.json`, data);  
  });
};