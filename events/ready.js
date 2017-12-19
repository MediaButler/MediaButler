const chalk = require('chalk');
const loadDb = require('../util/db/loadDb');
module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('I\'m Online'));
  client.user.setPresence({game: {name: 'MediaButler v0.3', type: 0}});
  loadDb(client);
};
