var sqlite3 = require('sqlite3').verbose();
const coreSettings = require(`${process.cwd()}/settings.json`);

module.exports = (guildId) =>
{
  const db = new sqlite3.Database(`${coreSettings['path']}/settings.sqlite`);    
  const p = new Promise((resolve, reject) => 
  {
    const sql = `SELECT setting,value FROM guildSettings WHERE guildId = ${guildId}`;
    db.all(sql, function(err, rows) {
      if (err) reject(err);
      if (rows.length === 0) reject('no results found');
      resolve(JSON.stringify(rows));
      db.close();
    });
  });
  return p;
};