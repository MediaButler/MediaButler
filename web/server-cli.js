const server = require('./server');
process.env.WEBPACK_PORT = 2486;
process.env.BASE_URL = 'http://localhost:2486/';
process.env.NODE_ENV = 'development';
if (server()) {
  console.log('Started server');
}