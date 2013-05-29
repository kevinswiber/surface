var Ast = {};

Ast.SelectStatementNode = function(fieldListNode, filterNode, orderByNode) {
  this.fieldListNode = fieldListNode;
  this.filterNode = filterNode;
  this.orderByNode = orderByNode;
  this.type = 'SelectStatement';
};

Ast.FieldListNode = function(seed) {
  this.fields = [];

  if (seed) {
    this.fields.push(seed);
  }

  this.type = 'FieldList';
};

Ast.FieldListNode.prototype.push = function(field) {
  this.fields.push(field);
};

Ast.FilterNode = function(expression) {
  this.expression = expression;
  this.type = 'Filter'
};

Ast.DisjunctionNode = function(left, right) {
  this.left = left;
  this.right = right;
  this.type = 'Disjunction';
};

Ast.ConjunctionNode = function(left, right) {
  this.left = left;
  this.right = right;
  this.type = 'Conjunction';
};

Ast.ComparisonPredicateNode = function(field, operator, value, isNegated) {
  this.field = field;
  this.operator = operator;
  this.value = value;
  this.isNegated = isNegated;
  this.type = 'ComparisonPredicate';
};

Ast.ContainsPredicateNode = function(field, value, isNegated) {
  this.field = field;
  this.operator = 'contains';
  this.value = value;
  this.isNegated = isNegated;
  this.type = 'ContainsPredicate';
};

Ast.LocationPredicateNode = function(field, value, isNegated) {
  this.field = field;
  this.operator = 'within';
  this.value = value;
  this.isNegated = isNegated;
  this.type = 'LocationPredicate';
};

Ast.LocationNode = function(distance, coordinates) {
  this.distance = distance;
  this.coordinates = coordinates;
  this.type = 'Location'
};

Ast.CoordinatesNode = function(lattitude, longitude) {
  this.lattitude = lattitude;
  this.longitude = longitude;
  this.type = 'Coordinates';
};

Ast.OrderByNode = function(sortList) {
  this.sortList = sortList;
  this.type = 'OrderBy';
};

Ast.SortListNode = function(initial) {
  this.sorts = [initial];
  this.type = 'SortList';
};

Ast.SortListNode.prototype.push = function(item) {
  this.sorts.push(item);
};

Ast.SortNode = function(field, direction) {
  this.field = field;
  this.direction = direction.toLowerCase();
  this.type = 'Sort';
};

Object.keys(Ast).forEach(function(key) {
  if (Ast.hasOwnProperty(key)) {
    Ast[key].prototype.accept = function(visitor) {
      visitor.visit(this);
    };
  }
});

module.exports = Ast;
