"use strict";

// We don't actually want to make real http requests, this fakes it for us.
let mockRequest = function(config, callback){

  if (this.mock.mock503) {
  	const err = new Error('Rate limited');
  	err.statusCode = 503;
    return callback(err);
  }

  callback(null, { response:'faked' }) ;
};

module.exports.mockRequest = mockRequest;