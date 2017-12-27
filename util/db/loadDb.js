const fs = require('fs');
const coreSettings = require(`${process.cwd()}/settings.json`);
const saveDb = require('./saveDb');
const uuid = require('uuid-v4');
module.exports = (client) =>  {
  client.guilds.forEach(guild => {
    fs.readFile(`${coreSettings['path']}/${guild.id}.json`, (err, data) => {  
      if (err) {
        fs.readFile(`${coreSettings['path']}/default.json`, (err, data2) => {
          guild.settings = JSON.parse(data2);
          guild.settings.uuidv4 = uuid();
          saveDb(client);
          console.log(`Loaded default settings for ${guild.id}`);
          return;      
        });
      } else {
        guild.settings = JSON.parse(data);
        console.log(`Loaded settings for ${guild.id}`);
      }
    });
  });
};