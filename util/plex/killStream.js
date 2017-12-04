module.exports = (plexClient, streamId, reason) =>
{
  const p = new Promise((resolve, reject) => 
  {
    plexClient.perform(`/status/sessions/terminate?sessionId=${streamId}&reason=${reason}`).then(function() {
      resolve();
    }, function(err) {
      console.log(err);
      reject(err);
    });
  });
  return p;
};