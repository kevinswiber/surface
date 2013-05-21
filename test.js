var Parser = require('./surface').Parser;
var Ast = require('./ast');

var parser = new Parser();

parser.yy = Ast;

var parsed;

parsed = parser.parse('SELECT * WHERE id=2');
console.log(parsed);

parsed = parser.parse('SELECT * WHERE name eq \'Kevin\' AND facebook.title=\'The Dude\' AND id=2');
console.log(parsed);


parsed = parser.parse('SELECT first_name, last_name, favorite_food, of WHERE name eq \'Kevin\' AND NOT location.coordinates within .5 of 40.042016, -86.900749 AND NOT id=2 && NOT name contains \'foo%\' && of=\'hi\' OR a=1');
console.log(parsed);
