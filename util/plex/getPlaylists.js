module.exports = (plexClient, qs) =>
{
  const p = new Promise((resolve, reject) => 
  {
    plexClient.query('/playlists/all?playlistType=audio')
      .then((res) => {
        if (res.MediaContainer.size == 1) {
          resolve(res.MediaContainer.Metadata[0].ratingKey);
        } else {
          for (let i = 0; i <= res.MediaContainer.size; i++)
          {
            if (res.MediaContainer.Metadata[i].title == qs) {
              resolve(res.MediaContainer.Metadata[i].ratingKey);
              return;
            }
          }
          reject('No results');
        }
      }, function(err) {
        reject(err);
      });
  });
  return p;
};