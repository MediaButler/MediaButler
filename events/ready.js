const chalk = require('chalk');
const getSettings = require('../util/getSettings');
const createGuild = require('../util/discordCreateGuild');
module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('I\'m Online'));
  client.user.setPresence({game: {name: "MediaButler v0.3", type: 0}});
  
  client.guilds.forEach((g) => {
    getSettings(g.id)
    .then(() => {
      console.log(`Loaded configuration for ${g.id}`);
    }).catch(() => {
      createGuild(g.id)
      .then(() => {
        console.log(`Sucessfully created configuration for ${g.id}`);
      }).catch((err)=> {
        console.log(`Unable to create configuration for ${g.id}:\n${err}`);
      });
    });
  });
};
