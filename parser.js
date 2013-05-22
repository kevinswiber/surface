var Ast = require('./ast');
var parser = require('./query').parser;

parser.yy = Ast;

exports.parse = function(query) {
  return parser.parse(query);
};
