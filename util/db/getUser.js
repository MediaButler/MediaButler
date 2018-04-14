const coreSettings = require(`${process.cwd()}/settings.json`);
const fs = require('fs');

module.exports = (user) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${coreSettings['path']}/user/${user.id}.json`, (err, data) => {
      if (err) {
        fs.readFile(`${coreSettings['path']}/user/default.json`, (err, data2) => {
          resolve(JSON.parse(data2));
        });
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};