const request = require('request');
module.exports = (show, season, episode) =>
{
  const p = new Promise((resolve, reject) =>
  {
    const url = `http://www.omdbapi.com/?t=${show.join(' ')}&Season=${season}&Episode=${episode}&apikey=5af02350&type=series`;
    request(url, function(e, r, b) {
      if (!e && r.statusCode === 200) resolve(JSON.parse(b));
      else reject(e);
    });   
  });
  return p;
};