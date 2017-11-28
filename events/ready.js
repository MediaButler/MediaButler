const chalk = require('chalk');
const getSettings = require('../util/getSettings');
module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('I\'m Online'));
  client.user.setPresence({game: {name: "MediaButler v0.2", type: 0}});
  
  client.guilds.forEach((g) => {
    getSettings(g.id)
    .then((res) => {
      console.log(`Loaded configuration for ${g.id}`);
    }).catch((err) => {
      // RUN GUILD CREATE SCRIPT
    });
  });
};
