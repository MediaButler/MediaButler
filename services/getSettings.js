var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite');

module.exports = (guildId) =>
{
    let sql = `SELECT setting,value FROM guildSettings WHERE guildId = ${guildId}`;
    db.all(sql, function(err, rows) {
        return JSON.stringify(rows);
        db.close();
    });
}