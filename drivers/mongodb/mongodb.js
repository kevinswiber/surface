var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var session = require('./session');

var MongoDbClient = function(options) {
  if (options && options.uri) {
    this.uri = options.uri;
  }

  this.db = null;
};

MongoDbClient.prototype.initialize = function(env, cb) {
  var self = this;
  if (!self.db) {
    MongoClient.connect(self.uri, function(err, db) {
      self.db = db;
      cb(session(self));
    });
  } else {
    cb(session(self));
  }
};

module.exports = function(options) {
  return new MongoDbClient(options);
};
