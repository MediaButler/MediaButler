const fs = require('fs');
const coreSettings = require(`${process.cwd()}/settings.json`);
module.exports = (client) =>  {
  client.guilds.forEach(guild => {
    fs.readFile(`${coreSettings['path']}/${guild.id}.json`, (err, data) => {  
      if (err) {
        fs.readFile(`${coreSettings['path']}/default.json`, (err, data) => {
          guild.settings = JSON.parse(data);
          console.log(`Loaded default settings for ${guild.id}`);          
        });
      }
      guild.settings = JSON.parse(data);
      console.log(`Loaded settings for ${guild.id}`);
    });
  });
};