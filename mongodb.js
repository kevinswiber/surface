var inflect = require('i')(true);
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

MongoVisitor.prototype.defaultItemQuery = function(id) {
  return 'select * where _id="' + id + '"'; 
};

MongoVisitor.prototype.defaultCollectionQuery = function() {
  return 'select *';
};

MongoVisitor.prototype.clear = function() {
  this.fields = [];
  this.conjunctions = [];
  this.disjunctions = [];
  this.andPredicates = [];
  this.orPredicates = [];
  this.sorts = [];
  this.collection = null;
};

MongoVisitor.prototype.build = function(collection, ql) {
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
      predicate.array = self.orPredicates;
      predicate.accept(self);
    });
  }

  if (this.andPredicates) {
    this.andPredicates.forEach(function(predicate) {
      Object.keys(predicate).forEach(function(key) {
        filter[key] = predicate[key]
      });
    });
  }

  if (this.orPredicates) {
    this.orPredicates.reverse().forEach(function(predicate) {
      var or = {};
      Object.keys(predicate).forEach(function(key) {
        or[key] = predicate[key];
      });

      filter = { $or: [filter, or] };
    });
  }

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
        doc.type = collectionString;
        return { id: doc._id, value: doc };
      });
      cb(err, null, { rows: docs, total_rows: docs.length });
      self.clear();
    };

    var options = {};

    if (fields) {
      options.fields = fields;
    }

    if (sorts) {
      options.sort = sorts;
    }
    
    self.db.collection(collection).find(filter, options).toArray(callback);
  };
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

  //this.map = this.createView();
};

MongoVisitor.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
};

MongoVisitor.prototype.visitFilter = function(filterList) {
  if (filterList.expression.type.slice(-9) === 'Predicate') {
    this.conjunctions.push(filterList.expression);
  } else {
    filterList.expression.accept(this);
  }
};

MongoVisitor.prototype.visitOrderBy = function(orderBy) {
  this.sorts = orderBy.sortList.sorts;
};

MongoVisitor.prototype.visitConjunction = function(conjunction) {
  var isRightPredicate = conjunction.right.type.slice(-9) === 'Predicate';

  if (isRightPredicate) {
    this.conjunctions.push(conjunction.right);
  }

  conjunction.left.array = this.andPredicates;
  conjunction.left.accept(this);

  if (!isRightPredicate) {
    conjunction.right.array = this.andPredicates
    conjunction.right.accept(this);
  }
};

MongoVisitor.prototype.visitDisjunction = function(disjunction) {
  var isRightPredicate = disjunction.right.type.slice(-9) === 'Predicate';

  if (isRightPredicate) {
    this.disjunctions.push(disjunction.right);
  }

  disjunction.left.accept(this);

  if (!isRightPredicate) {
    disjunction.right.accept(this);
  }
};

MongoVisitor.prototype.visitComparisonPredicate = function(comparison) {
  var obj = {};

  var val = comparison.value[0] === '\'' || comparison.value[0] === '"'
    ? comparison.value.slice(1, -1)
    : Number(comparison.value);

  switch(comparison.operator) {
    case 'eq': obj[comparison.field] = val; break;
    case 'lt': obj[comparison.field] = { $lt: val }; break;
    case 'lte': obj[comparison.field] = { $lte: val }; break;
    case 'gt': obj[comparison.field] = { $gt: val }; break;
    case 'gte': obj[comparison.field] = { $gte: val }; break;
  }

  if (!comparison.array) comparison.array = [];
  comparison.array.push(obj);
};

MongoVisitor.prototype.exec = function(collection, query, cb) {
  var fn = this.build(collection, query);
  fn(cb);
};

module.exports = function(options) { return new MongoVisitor(options); };
