const request = require('request');
module.exports = (searchTerms) =>
{
    const p = new Promise((resolve, reject) =>
    {
        let url = `http://www.omdbapi.com/?t=${searchTerms.join(" ")}&apikey=5af02350&type=movie`;
        request(url, function (e, r, b) {
            if (!e && r.statusCode === 200) resolve(JSON.parse(b));
            else reject(e);
        });   
    });
    return p;
}