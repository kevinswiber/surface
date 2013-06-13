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
  this.map = null;
  this.uri = '';

  if (options && options.uri) {
    this.uri = options.uri;
  }

  MongoClient.connect(this.uri, function(err, db) {
    this.db = db;
  });
};

MongoVisitor.prototype.build = function(collection, query) {
};

MongoVisitor.prototype.visit = function(node) {
  this['visit' + node.type](node);
};

MongoVisitor.prototype.visitSelectStatement = function(statement) {
  statement.fieldListNode.accept(this);
  if (statement.filterNode) {
    statement.filterNode.accept(this);
  }

  if (statement.orderByNode) {
    statement.orderByNode.accept(this);
  }

  this.map = this.createView();
};

MongoVisitor.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
};

MongoVisitor.prototype.exec = function(collection, query, cb) {
  var fn = this.build(collection, query);
  fn(cb);
};

module.exports = function(options) { return new MongoVisitor(options); };
