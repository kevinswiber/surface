var request = require('request');
var compiler = require('./compiler');

var UsergridSession = function(client) {
  this.compiler = compiler({ uri: client.uri });
};

UsergridSession.prototype.find = function(collection, ql, cb) {
  var options = {
    collection: collection,
    ql: ql
  };

  var fn = this.compiler.compile(options);
  fn(cb);
};

UsergridSession.prototype.findOne = function(collection, id, cb) {
  var options = {
    collection: collection,
    id: id
  };

  var fn = this.compiler.compile(options);
  fn(cb);
};


module.exports = function(client) {
  return new UsergridSession(client);
};

