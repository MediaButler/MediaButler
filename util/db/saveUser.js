const fs = require('fs');
const coreSettings = require(`${process.cwd()}/settings.json`);
module.exports = (user) =>  {
  const data = JSON.stringify(user.settings, null, 2);  
  fs.writeFileSync(`${coreSettings['path']}/user/${user.id}.json`, data); 
};