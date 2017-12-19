const coreSettings = require(`${process.cwd()}/settings.json`);
const fs = require('fs');
module.exports = (guild) => {
  fs.unlinkSync(`${coreSettings['path']}/${guild.id}.json`);  
};