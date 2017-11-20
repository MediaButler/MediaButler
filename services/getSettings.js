var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./settings.sqlite');

module.exports = (guildId) =>
{
    const p = new Promise(
        function (resolve, reject) {
            let sql = `SELECT setting,value FROM guildSettings WHERE guildId = ${guildId}`;
            db.all(sql, function(err, rows) {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(JSON.stringify(rows));
                }
                db.close();
            });
        });
    return p;
}