var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite');

exports.getSettings = guildId =>
{
    let sql = `SELECT setting,value FROM guildSettings WHERE guildId = ${guildId}`;
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            return (JSON.stringify(rows));
        });
    });
    db.close();
};