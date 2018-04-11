module.exports = (plexClient, id) =>
{
  const p = new Promise((resolve, reject) => 
  {
    plexClient.query(`/playlists/${id}/items`)
      .then((res) => {
        resolve(res.MediaContainer);
      }, function(err) {
        reject(err);
      });
  });
  return p;
};