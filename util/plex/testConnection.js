module.exports = (plexClient) =>
{
  const p = new Promise((resolve, reject) => 
  {
    plexClient.query('/')
      .then((res) => {
        resolve(res);
      }, function(err) {
        reject(err);
      });
  });
  return p;
};
