const chalk = require('chalk');
module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('I\'m Online'));
  client.user.setPresence({game: {name: "MediaButler v0.1", type: 0}});  
};
