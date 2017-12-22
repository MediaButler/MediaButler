const server = require('./server');
process.env.WEBPACK_PORT = 2486;
process.env.BASE_URL = 'http://localhost:2486/';
process.env.NODE_ENV = 'development';
process.env.AUTH0_PUB_KEY = 'rGGqAH7lbdAq9LyZ1egFoDpQiqTlJZZ7';
process.env.AUTH0_DOMAIN = 'mediabutler.eu.auth0.com';
if (server()) {
  console.log('Started server');
}