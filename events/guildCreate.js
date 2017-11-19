const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

module.exports = (guild, client) => {
    // We have joined a new discord server, we need to populate and prepare for configuration.
    // Looking at a db backend, possibly sqlite to hold the "server configurations"
    console.log(guild.id);
};