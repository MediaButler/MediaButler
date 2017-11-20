var sqlite3 = require('sqlite3').verbose();

module.exports = function (guildId)
{
    let db = new sqlite3.Database('./settings.sqlite');    
    let sql = `SELECT setting,value FROM guildSettings WHERE guildId = ${guildId}`;
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            return (JSON.stringify(rows));
        });
    });
    db.close();
};