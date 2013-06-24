var compiler = require('./compiler');

var CouchDbSession = function(client) {
  this.compiler = compiler({ uri: client.uri });
};

CouchDbSession.prototype.find = function(collection, query, cb) {
  if (!query) {
    query = 'select * where _id > "0"';
  }

  var fn = this.compiler.compile(collection, query);
  fn(cb);
};

CouchDbSession.prototype.findOne = function(collection, id, cb) {
  var ql = 'select * where _id="' + id + '"';
  this.find(collection, ql, cb);
};

module.exports = function(client) {
  return new CouchDbSession(client);
};
