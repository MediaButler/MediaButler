var sqlite3 = require('sqlite3').verbose();

module.run = function (guildId)
{
    let db = new sqlite3.Database('./settings.sqlite');    
    let sql = `SELECT setting,value FROM guildSettings WHERE guildId = ${guildId}`;
    let output;
    db.all(sql, function(err,rows) {
        return rows;
    });
    //db.close();
};