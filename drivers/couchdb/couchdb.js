var session = require('./session');

var CouchDbClient = function(options) {
  if (options && options.uri) {
    this.uri = options.uri;
  }
};

CouchDbClient.prototype.initialize = function(env, cb) {
  cb(session(this));
};

module.exports = function(options) {
  return new CouchDbClient(options);
};
