const request = require('request');
module.exports = (searchTerms) =>
{
    const p = new Promise(
        function (resolve, reject) {
            let url = `http://www.omdbapi.com/?t=${searchTerms.join(" ")}&apikey=5af02350&type=series`;
            request(url, function (e, r, b) {
                if (!e && r.statusCode === 200) {
                  let i = JSON.parse(b);
                    resolve(i);
                }
                else {
                    reject(e);
                }
            });   
        });
    return p;
}