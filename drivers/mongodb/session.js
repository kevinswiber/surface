var compiler = require('./compiler');

var MongoDbSession = function(client) {
  this.compiler = compiler({ db: client.db });
};

MongoDbSession.prototype.find = function(collection, query, cb) {
  if (!query) {
    query = 'select *';
  }

  var fn = this.compiler.compile(collection, query);
  fn(cb);
};

MongoDbSession.prototype.findOne = function(collection, id, cb) {
  var ql = 'select * where _id="' + id + '"';
  this.find(collection, ql, cb);
};

module.exports = function(client) {
  return new MongoDbSession(client);
};
