var inflect = require('i')(true);
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var parser = require('../../parser');

var MongoClient = mongodb.MongoClient;

var MongoDbCompiler = function(options) {
  this.fields = [];
  this.conjunctions = [];
  this.disjunctions = [];
  this.andPredicates = [];
  this.orPredicates = [];
  this.sorts = [];
  this.collection = null;
  this.db = null;
  this.filter = [];
  this.lastOr = [];
  this.ors = [];

  if (options && options.db) {
    this.db = options.db;
  }
};

MongoDbCompiler.prototype.compile = function(collection, ql) {
  this.collection = collection;

  var root = parser.parse(ql);
  root.accept(this);

  var self = this;
  var fields;
  var filter = {};
  var sorts = {};

  if (!self.fields.length || self.fields[0] === '*') {
    fields = null; 
  } else {
    fields = {};
    self.fields.forEach(function(field) {
      fields[field] = 1;
    });
  }

  var filter = {};
  this.filter.forEach(function(condition) {
    Object.keys(condition).forEach(function(k) {
      filter[k] = condition[k];
    });
  });

  if (this.sorts) {
    this.sorts.forEach(function(sort) {
      var val = sort.direction === 'asc' ? 1 : -1;
      sorts[sort.field] = val;
    });
  }

  var collectionString = inflect.singularize(collection);
  return function(cb) {
    var callback = function(err, docs) {
      docs = docs.map(function(doc) {
        var id = doc._id;
        if (doc['_id'] && self.fields.indexOf('_id') === -1 && self.fields.indexOf('*') === -1) {
          delete doc['_id'];
        }
        return { id: id, type: collectionString, value: doc };
      });
      cb(err, { rows: docs, count: docs.length });
    };

    var options = {};

    if (fields) {
      options.fields = fields;
    }

    if (sorts && Object.keys(sorts).length) {
      options.sort = sorts;
    }

    self.db.collection(collection).find(filter, options).toArray(callback);
  };
};

MongoDbCompiler.prototype.visit = function(node) {
  this['visit' + node.type](node);
};

MongoDbCompiler.prototype.visitSelectStatement = function(statement) {
  statement.fieldListNode.accept(this);
  if (statement.filterNode) {
    statement.filterNode.accept(this);
  }

  if (statement.orderByNode) {
    statement.orderByNode.accept(this);
  }
};

MongoDbCompiler.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
};

MongoDbCompiler.prototype.visitFilter = function(filterList) {
  filterList.expression.accept(this);
};

MongoDbCompiler.prototype.visitOrderBy = function(orderBy) {
  this.sorts = orderBy.sortList.sorts;
};

MongoDbCompiler.prototype.visitConjunction = function(conjunction) {
  if (conjunction.isNegated) {
    conjunction.left.negate();
    conjunction.right.negate();
  }

  var obj = {};
  conjunction.left.obj = conjunction.right.obj = obj;

  conjunction.left.dir = 'left';
  conjunction.right.dir = 'right';
  conjunction.left.accept(this);
  conjunction.right.accept(this);
};

MongoDbCompiler.prototype.visitDisjunction = function(disjunction) {
  this.ors.push({ isNegated: disjunction.isNegated, value: [] });
  disjunction.left.accept(this);
  disjunction.right.accept(this);
};

MongoDbCompiler.prototype.visitComparisonPredicate = function(comparison) {
  var obj = {};

  var val;

  if (typeof comparison.value === 'boolean' || comparison.value == null) {
    val = comparison.value
  } else {
    val = comparison.value[0] === '\'' || comparison.value[0] === '"'
      ? comparison.value.slice(1, -1)
      : Number(comparison.value);
  }

  var mongoVal;
  switch(comparison.operator) {
    case 'eq': mongoVal = val; break;
    case 'lt': mongoVal = { $lt: val }; break;
    case 'lte': mongoVal = { $lte: val }; break;
    case 'gt': mongoVal = { $gt: val }; break;
    case 'gte': mongoVal = { $gte: val }; break;
  }

  if (comparison.isNegated) {
    var op = comparison.operator === 'eq' ? '$ne' : '$not';
    var v = {};
    v[op] = mongoVal;
    mongoVal = v;
  }

  obj[comparison.field] = mongoVal;

  var cur = obj;
  if (comparison.obj) {
    if (comparison.obj[comparison.field]) {
      throw new Error('Syntax error: multiple instances of `' + comparison.field + '`.');
    }
    comparison.obj[comparison.field] = obj[comparison.field];
    if (comparison.dir === 'right') {
      if (this.ors.length) {
        cur = comparison.obj;
      } else {
        this.filter.push(comparison.obj);
      }
    }
  }

  if (this.ors.length && (!comparison.obj || !comparison.dir || comparison.dir === 'right')) {
    var or = this.ors[this.ors.length - 1];
    if (or.value.length < 2) {
      or.value.push(cur);
    }
    
    while (this.ors.length && (or = this.ors[this.ors.length - 1]).value.length == 2) {
      var lastOr = this.ors.pop();
      if (this.ors.length && this.ors[this.ors.length - 1].value.length < 2) {
        var dis = {};
        var op = lastOr.isNegated ? '$nor' : '$or';
        dis[op] = lastOr.value;
        this.ors[this.ors.length - 1].value.push(dis);
      } else  {
        var dis = {};
        var op = lastOr.isNegated ? '$nor' : '$or';
        dis[op] = lastOr.value;
        this.filter.push(dis);
      }
    }
  } else if (!comparison.obj) {
    this.filter.push(cur);
  }
};

module.exports = function(options) { return new MongoDbCompiler(options); };
