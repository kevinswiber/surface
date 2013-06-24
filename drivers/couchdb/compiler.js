var request = require('request');
var parser = require('../../parser');

var CouchDbCompiler = function(options) {
  this.fields = [];
  this.conjunctions = [];
  this.disjunctions = [];
  this.andPredicates = [];
  this.orPredicates = [];
  this.sorts = [];
  this.map = null;

  if (options && options.uri) {
    this.uri = options.uri;
  }
};

CouchDbCompiler.prototype.compile = function(collection, ql) {
  var root = parser.parse(ql);
  root.accept(this);

  var opts = {
    uri: this.uri + '/' + encodeURIComponent(collection) + '/_temp_view',
    method: 'POST',
    body: JSON.stringify({ map: this.map}),
    headers: { 'Content-Type': 'application/json' }
  };

  var self = this;

  if (!this.sorts || !this.sorts.length) {
    return function(cb) {
      request(opts, function(err, res, body) {
        if (body && typeof body === 'string') {
          body = JSON.parse(body);
        };

        if (body.rows) {
          body.rows = body.rows.map(function(row) {
            row.type = row.value.type;
            if (self.fields && self.fields[0] !== '*' && self.fields.indexOf('type') === -1) {
              delete row.value.type;
            }
            return row;
          });
        }

        body.count = body.total_rows;
        delete body.total_rows;

        cb(err, body);
      });
    };
  } else {
    var that = this;
    return function(cb) {
      request(opts, function(err, res, body) {
        if (body && typeof body === 'string') {
          body = JSON.parse(body);
        };
        if (body.rows) {
          that.sorts.forEach(function(sort) {
            if (sort.direction === 'asc') {
              body.rows = body.rows.sort(function(a, b) {
                if (a.value[sort.field] > b.value[sort.field]) return 1;
                if (a.value[sort.field] < b.value[sort.field]) return -1;
                return 0;
              });
            } else if (sort.direction === 'desc') {
              body.rows = body.rows.sort(function(a, b) {
                if (a.value[sort.field] < b.value[sort.field]) return 1;
                if (a.value[sort.field] > b.value[sort.field]) return -1;
                return 0;
              });
            }
          });

          body.rows = body.rows.map(function(row) {
            row.type = row.value.type;
            if (self.fields && self.fields[0] !== '*' && self.fields.indexOf('type') === -1) {
              delete row.value.type;
            }
            return row;
          });
        }

        body.count = body.total_rows;
        delete body.total_rows;

        cb(err, body);
      });
    };
  }
};

CouchDbCompiler.prototype.visit = function(node) {
  this['visit' + node.type](node);
};

CouchDbCompiler.prototype.visitSelectStatement = function(statement) {
  statement.fieldListNode.accept(this);
  if (statement.filterNode) {
    statement.filterNode.accept(this);
  }

  if (statement.orderByNode) {
    statement.orderByNode.accept(this);
  }

  this.map = this.createView();
};

CouchDbCompiler.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
};

CouchDbCompiler.prototype.visitFilter = function(filterList) {
  if (filterList.expression.type.slice(-9) === 'Predicate') {
    this.conjunctions.push(filterList.expression);
  } else {
    filterList.expression.accept(this);
  }
};

CouchDbCompiler.prototype.visitDisjunction = function(disjunction) {
  var isRightPredicate = disjunction.right.type.slice(-9) === 'Predicate';

  if (isRightPredicate) {
    this.disjunctions.push(disjunction.right);
  }

  disjunction.left.accept(this);

  if (!isRightPredicate) {
    disjunction.right.accept(this);
  }
};

CouchDbCompiler.prototype.visitOrderBy = function(orderBy) {
  this.sorts = orderBy.sortList.sorts;
};

CouchDbCompiler.prototype.visitConjunction = function(conjunction) {
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

CouchDbCompiler.prototype.visitComparisonPredicate = function(comparison) {
  var op;

  switch(comparison.operator) {
    case 'eq': op = comparison.isNegated ? '!==' : '=='; break;
    case 'lt': op = comparison.isNegated ? '>=' : '<'; break;
    case 'lte': op = comparison.isNegated ? '>' : '<='; break;
    case 'gt': op = comparison.isNegated ? '<=' : '>'; break;
    case 'gte': op = comparison.isNegated ? '<' : '>='; break;
  }

  var str = 'doc[\'' + comparison.field + '\']' + op + ' ' + comparison.value;
  if (!comparison.array) comparison.array = [];
  comparison.array.push(str);
};

CouchDbCompiler.prototype.createView = function() {
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
    if (!~this.fields.indexOf('type')) {
      this.fields.push('type');
    }
    this.fields.forEach(function(field) {
      emit.push('\'' + field + '\': doc[\'' + field + '\']');
    });

    emitStr = '{ ' + emit.join(',') + ' }';
  }


  var prefix = 'function(doc) { if (';
  var postfix = ') { emit(doc._id,' + emitStr + '); } }';

  str = str || 'true';

  var map = prefix + str + postfix;

  return map;
};

module.exports = function(options) {
  return new CouchDbCompiler(options);
};
