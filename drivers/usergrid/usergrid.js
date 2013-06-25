var request = require('request');
var session = require('./session');

var UsergridClient = function(options) {
  if (options && options.uri) {
    this.uri = options.uri;
  }
};

UsergridClient.prototype.initialize = function(env, cb) {
  cb(session(this));
};

module.exports = function(options) {
  return new UsergridClient(options);
};
