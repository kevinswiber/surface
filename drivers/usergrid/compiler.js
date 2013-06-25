var request = require('request');
var parser = require('../../parser');

var UsergridCompiler = function(options) {
  this.fields = [];
  this.conjunctions = [];
  this.disjunctions = [];
  this.andPredicates = [];
  this.orPredicates = [];
  this.sorts = '';

  this.removeUUID = false;
  this.removeType = false;

  if (options && options.uri) {
    this.uri = options.uri;
  }
};

UsergridCompiler.prototype.visit = function(node) {
  this['visit' + node.type](node);
};

UsergridCompiler.prototype.compile = function(options) {
  if (options.collection && options.ql) {
    return this._compileCollectionQuery(options.collection, options.ql);
  } else if (options.collection && options.id) {
    return this._compileItem(options.collection, options.id, options.ql);
  } else if (options.collection) {
    return this._compileCollection(options.collection);
  }
};

UsergridCompiler.prototype._compileCollection = function(collection) {
  var url = this.uri;
  if (collection) {
    url += '/' + collection;
  }

  var options = {
    uri: url,
    method: 'GET'
  };

  var self = this;
  return function(cb) {
    self._request(options, cb);
  }
};

UsergridCompiler.prototype._compileItem = function(collection, id) {
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

  var self = this;
  return function(cb) {
    self._request(options, cb);
  }
};

UsergridCompiler.prototype._compileCollectionQuery = function(collection, ql) {
  var root = parser.parse(ql);
  root.accept(this); 

  var conjunctions;
  var disjunctions;
  var filter = '';

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

  if (this.andPredicates.length) {
    filter = this.andPredicates.join(' and ');
  }

  if (this.orPredicates.length) {
    filter += ' or ' + this.orPredicates.reverse().join(' or ');
  }

  var statement = 'select ' + this.fields.join(',');

  if (filter) {
    statement += ' where ' + filter;
  }

  if (this.sorts) {
    statement += ' order by ' + this.sorts;
  }

  var url = this.uri;
  if (collection) {
    url += '/' + collection;
  }

  if (statement) {
    url += '?ql=' + encodeURIComponent(statement);
  }

  var options = {
    uri: url,
    method: 'GET'
  };

  var self = this;
  return function(cb) {
    self._request(url, cb);
  }
};

UsergridCompiler.prototype.visitSelectStatement = function(statement) {
  statement.fieldListNode.accept(this);
  if (statement.filterNode) {
    statement.filterNode.accept(this);
  }
  if (statement.orderByNode) {
    statement.orderByNode.accept(this);
  }
};

UsergridCompiler.prototype.visitFieldList = function(fieldList) {
  this.fields = fieldList.fields;
  if (this.fields[0] !== '*') {
    if (this.fields.indexOf('uuid') === -1) {
      this.fields.push('uuid');
      this.removeUUID = true;
    }
    if (this.fields.indexOf('type') === -1) {
      this.fields.push('type');
      this.removeType = true;
    }
  }
};

UsergridCompiler.prototype.visitFilter = function(filterList) {
  if (filterList.expression.type.slice(-9) === 'Predicate') {
    this.conjunctions.push(filterList.expression);
  } else {
    filterList.expression.accept(this);
  }
};

UsergridCompiler.prototype.visitOrderBy = function(orderBy) {
  this.sorts = orderBy.sortList.sorts.map(function(sort) {
    var str = sort.field;
    if (sort.direction) {
      str += ' ' + sort.direction;
    }

    return str;
  }).join(' ');
};

UsergridCompiler.prototype.visitConjunction = function(conjunction) {
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

UsergridCompiler.prototype.visitDisjunction = function(disjunction) {
  var isRightPredicate = disjunction.right.type.slice(-9) === 'Predicate';

  if (isRightPredicate) {
    this.disjunctions.push(disjunction.right);
  }

  disjunction.left.accept(this);

  if (!isRightPredicate) {
    disjunction.right.accept(this);
  }
};

UsergridCompiler.prototype.visitComparisonPredicate = function(comparison) {
  if (!comparison.array) comparison.array = [];
  var expr = [comparison.field, comparison.operator, comparison.value];
  comparison.array.push(expr.join(' '));
};

UsergridCompiler.prototype._request = function(options, cb) {
  var self = this;
  request(options, function(err, res, body) {
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    var ret;
    if (body && body.entities) {
      var ents = [];
      body.entities.forEach(function(entity) {
        ents.push({ id: entity.uuid, type: entity.type, value: entity });
      });
      ret = { count: body.entities.length, rows: ents };
    } else if (body && body.list) {
      var queryFields = self.fields;

      var ents = [];
      body.list.forEach(function(entityFields) {
        var entity = {};
        for (var i = 0; i < queryFields.length; i++) {
          entity[queryFields[i]] = entityFields[i];
        }

        var id = entity.uuid;
        var type = entity.type;

        if (self.removeUUID) {
          delete entity['uuid'];
        }

        if (self.removeType) {
          delete entity['type'];
        }

        ents.push({ id: id, type: type, value: entity });
      });

      ret = { count: body.list.length, rows: ents };
    } else {
      ret = { count: 0, rows: [] };
    }

    cb(err, ret);
  });
};


module.exports = function(options) {
  return new UsergridCompiler(options);
};
