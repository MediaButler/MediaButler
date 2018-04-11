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
            console.log(res.MediaContainer.Playlist[i]);
            if (res.MediaContainer.Playlist[i].title == qs) {
              resolve(res.Playlist[i].ratingKey);
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