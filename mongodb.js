var mongodb = require('mongodb');
var parser = require('./parser');

var MongoClient = mongodb.MongoClient;

var MongoVisitor = function(options) {
  this.fields = [];
  this.conjunctions = [];
  this.disjunctions = [];
  this.andPredicates = [];
  this.orPredicates = [];
  this.sorts = [];
  this.collection = null;
  this.db = null;
  this.uri = '';

  if (options && options.uri) {
    this.uri = options.uri;
  }

  var self = this;
  MongoClient.connect(this.uri, function(err, db) {
    self.db = db;
  });
};

MongoVisitor.prototype.build = function(collection, ql) {
  this.collection = collection;

  var root = parser.parse(ql);
  root.accept(this);

  var self = this;
  return function(cb) {
    var fields;
    var filter = {};
    if (!self.fields.length || self.fields[0] === '*') {
      fields = null; 
    } else {
      fields = {};
      self.fields.forEach(function(field) {
        fields[field] = 1;
      });
    }

    var callback = function(err, docs) {
      docs = docs.map(function(doc) {
        doc.type = self.collection;
        return { value: doc };
      });
      cb(err, null, { rows: docs, total_rows: docs.length });
    };

    if (!fields) {
      self.db.collection(self.collection).find(filter).toArray(callback);
    } else {
      self.db.collection(self.collection).find(filter, fields).toArray(callback);
    }
  };
};

MongoVisitor.prototype.visit = function(node) {
  this['visit' + node.type](node);
};

MongoVisitor.prototype.visitSelectStatement = function(statement) {
  statement.fieldListNode.accept(this);
  /*if (statement.filterNode) {
    statement.filterNode.accept(this);
  }*/

  /*if (statement.orderByNode) {
    statement.orderByNode.accept(this);
  }*/

  //this.map = this.createView();
};

MongoVisitor.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
};

MongoVisitor.prototype.exec = function(collection, query, cb) {
  var fn = this.build(collection, query);
  fn(cb);
};

module.exports = function(options) { return new MongoVisitor(options); };
