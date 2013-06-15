var request = require('request');

var UsergridClient = function(options) {
  if (options && options.uri) {
    this.uri = options.uri;
  }
};

UsergridClient.prototype.defaultItemQuery = function(id) {
  return 'select * where id="' + id + '"'; 
};

UsergridClient.prototype.defaultCollectionQuery = function() {
  return 'select *';
};

UsergridClient.prototype._request = function(options, cb) {
  request(options, function(err, res, body) {
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    var ret;
    if (body.entities) {
      var ents = [];
      var entities = body.entities.forEach(function(entity) {
        ents.push({ id: entity.uuid, value: entity });
      });
      ret = { total_rows: body.entities.length, rows: ents };
    } else {
      ret = { total_rows: 0, rows: [] };
    }

    cb(err, res, ret);
  });
};

UsergridClient.prototype.findOne = function(collection, id, cb) {
  var url = this.uri;
  if (collection) {
    url += '/' + collection;
  }

  if (id) {
    url += '/' + id;
  }

  var options = {
    uri: url,
    method: 'GET'
  };

  this._request(options, cb);
};

UsergridClient.prototype.find = function(collection, ql, cb) {
  var url = this.uri;
  if (collection) {
    url += '/' + collection;
  }

  if (ql) {
    url += '?ql=' + ql;
  }

  var options = {
    uri: url,
    method: 'GET'
  };

  this._request(options, cb);
};

module.exports = function(options) { return new UsergridClient(options); };
