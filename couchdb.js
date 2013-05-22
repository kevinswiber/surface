var request = require('request');
var parser = require('./parser');

var CouchVisitor = function(options) {
  this.fields = [];
  this.conjunctions = [];
  this.disjunctions = [];
  this.andPredicates = [];
  this.orPredicates = [];
  this.map = null;

  if (options && options.uri) {
    this.uri = options.uri;
  }
};

CouchVisitor.prototype.build = function(ql) {
  var root = parser.parse(ql);
  root.accept(this);

  var opts = {
    uri: this.uri + '/_temp_view',
    method: 'POST',
    body: JSON.stringify({ map: this.map}),
    headers: { 'Content-Type': 'application/json' }
  };

  return function(cb) { request(opts, cb); };
};

CouchVisitor.prototype.visit = function(node) {
  this['visit' + node.type](node);
};

CouchVisitor.prototype.visitSelectStatement = function(statement) {
  statement.fieldListNode.accept(this);
  statement.filterNode.accept(this);
};

CouchVisitor.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
};

CouchVisitor.prototype.visitFilter = function(filterList) {
  if (filterList.expression.type.slice(-9) === 'Predicate') {
    this.conjunctions.push(filterList.expression);
  } else {
    filterList.expression.accept(this);
  }

  this.map = this.createView();
};

CouchVisitor.prototype.visitDisjunctionNode = function(disjunction) {
  var isRightPredicate = disjunction.right.type.slice(-9) === 'Predicate';

  if (isRightPredicate) {
    this.disjunctions.push(disjunction.right);
  }

  disjunction.left.accept(this);

  if (!isRightPredicate) {
    disjunction.right.accept(this);
  }
};

CouchVisitor.prototype.visitConjunctionNode = function(conjunction) {
  var isRightPredicate = conjunction.right.type.slice(-9) === 'Predicate';

  if (isRightPredicate) {
    this.conjunctions.push(conjunction.right);
  }

  conjunction.left.accept(this);

  if (!isRightPredicate) {
    conjunction.right.accept(this);
  }
};

CouchVisitor.prototype.visitComparisonPredicate = function(comparison) {
  var op;

  switch(comparison.operator) {
    case 'eq': op = comparison.isNegated ? '!==' : '=='; break;
    case 'lt': op = comparison.isNegated ? '>=' : '<'; break;
    case 'lte': op = comparison.isNegated ? '>' : '<='; break;
    case 'gt': op = comparison.isNegated ? '<=' : '>'; break;
    case 'gte': op = comparison.isNegated ? '<' : '>='; break;
  }

  var str = 'doc[\'' + comparison.field + '\']' + op + ' ' + comparison.value;
  comparison.array.push(str);
};

CouchVisitor.prototype.createView = function() {
  var conjunctions;
  var disjunctions;

  if (this.conjunctions) {
    var self = this;
    this.conjunctions.forEach(function(predicate) {
      predicate.array = self.andPredicates;
      predicate.accept(self);
    });
  }

  if (this.disjunctions) {
    var self = this;
    this.disjunctions.forEach(function(predicate) {
      predicate.array = orPredicates;
      predicate.accept(self);
    });
  }

  var andStr;
  var orStr;

  if (this.andPredicates) {
    andStr = this.andPredicates.join(' && ');
  }
  
  if (this.orPredicates) {
    orStr = this.orPredicates.join(' || ');
  }

  var str = andStr;
  if (orStr) {
    str = str + ' || ' + orStr;
  }

  var emitStr;

  if (this.fields[0] === '*') {
    emitStr = 'doc'
  } else {
    var emit = [];
    this.fields.forEach(function(field) {
      emit.push('\'' + field + '\': doc[\'' + field + '\']');
    });

    emitStr = '{ ' + emit.join(',') + ' }';
  }


  var prefix = 'function(doc) { if (';
  var postfix = ') { emit(doc._id,' + emitStr + '); } }';

  var map = prefix + str + postfix;

  return map;
};

CouchVisitor.prototype.exec = function(query, cb) {
  var fn = this.build(query);
  fn(cb);
};

module.exports = function(options) { return new CouchVisitor(options); };
