const request = require('request');
module.exports = (searchTerms) =>
{
    const p = new Promise((resolve, reject) =>
    {
        let url = `https://kitsu.io/api/edge/manga?filter%5Btext%5D=${searchTerms.join(" ")}`;
        request(url, function (e, r, b) {
            if (!e && r.statusCode === 200) resolve(JSON.parse(b));
            else reject(e);
        });
    });
    return p;
}
