var Ast = {};

Ast.SelectStatementNode = function(fieldListNode, filterNode) {
  this.fieldListNode = fieldListNode;
  this.filterNode = filterNode;
  this.type = 'selectStatement';
};

Ast.FieldListNode = function(seed) {
  this.fields = [];

  if (seed) {
    this.fields.push(seed);
  }

  this.type = 'fieldListNode';
};

Ast.FieldListNode.prototype.push = function(field) {
  this.fields.push(field);
};

Ast.FilterNode = function(expression) {
  this.expression = expression;
  this.type = 'filter'
};

Ast.DisjunctionNode = function(left, right) {
  this.left = left;
  this.right = right;
  this.type = 'disjunction';
};

Ast.ConjunctionNode = function(left, right) {
  this.left = left;
  this.right = right;
  this.type = 'conjunction';
};

Ast.ComparisonPredicateNode = function(field, comparison, value, isNegated) {
  this.field = field;
  this.comparison = comparison;
  this.value = value;
  this.isNegated = isNegated;
  this.type = 'comparisonPredicate';
};

Ast.ContainsPredicateNode = function(field, value, isNegated) {
  this.field = field;
  this.comparison = 'contains';
  this.value = value;
  this.isNegated = isNegated;
  this.type = 'containsPredicate';
};

Ast.LocationPredicateNode = function(field, value, isNegated) {
  this.field = field;
  this.comparison = 'within';
  this.value = value;
  this.isNegated = isNegated;
  this.type = 'locationPredicate';
};

Ast.LocationNode = function(distance, coordinates) {
  this.distance = distance;
  this.coordinates = coordinates;
  this.type = 'location'
};

Ast.CoordinatesNode = function(lattitude, longitude) {
  this.lattitude = lattitude;
  this.longitude = longitude;
  this.type = 'coordinates';
};

module.exports = Ast;
