const axios = require('axios');
var qs = require('querystring');

module.exports = (url, token) => {
  const p = new Promise((resolve, reject) => {
    axios.post(url + '/api/?v1/plugin', 'data%5Bplugin%5D=MB%2Fconfig%2Fget', { headers: { 'token': token } })
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return p;
};