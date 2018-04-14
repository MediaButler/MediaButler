module.exports = (plexClient, qs, offset, limit) =>
{
  const p = new Promise((resolve, reject) => 
  {
    plexClient.query(`/search/?type=10&query=${qs}&X-Plex-Container-Start=${offset}&X-Plex-Container-Size=${limit}`)
      .then((res) => {
        resolve(res.MediaContainer);
      }, function(err) {
        reject(err);
      });
  });
  return p;
};