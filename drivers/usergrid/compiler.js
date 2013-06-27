var request = require('request');
var parser = require('../../parser');

var UsergridCompiler = function(options) {
  this.fields = [];
  this.sorts = '';
  this.filter = [];
  this.query = [];

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

  var statement = 'select ' + this.fields.join(', ');

  if (this.filter.length) {
    statement += ' where ' + this.filter.join(' ');
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
  filterList.expression.accept(this);
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
  this.filter.push('(');
  conjunction.left.accept(this);
  this.filter.push('and');
  conjunction.right.accept(this);
  this.filter.push(')');
};

UsergridCompiler.prototype.visitDisjunction = function(disjunction) {
  this.filter.push('(');
  disjunction.left.accept(this);
  this.filter.push('or');
  disjunction.right.accept(this);
  this.filter.push(')');
};

UsergridCompiler.prototype.visitComparisonPredicate = function(comparison) {
  if (!comparison.array) comparison.array = [];
  var expr = [comparison.field, comparison.operator, comparison.value];
  comparison.array.push(expr.join(' '));
  this.filter.push(expr.join(' '));
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
