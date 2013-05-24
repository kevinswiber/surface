var query = require('./query');
var Ast = require('./ast');

query.parser.yy = Ast;

var parsed;

/*parsed = query.parse('SELECT * WHERE id=2');
console.log(parsed);

parsed = query.parse('SELECT * WHERE name eq \'Kevin\' AND facebook.title=\'The Dude\' AND id=2');
console.log(parsed);*/


parsed = query.parse("SELECT [h\\]ot dogs], first_name, last_name, favorite_food, of, contains, within, [where] WHERE where=0 and [or]=3 and name eq 'Ke\\'vin' AND NOT location.coordinates within .5 of 40.042016, -86.900749 AND NOT id=2 && NOT name contains 'foo%' && of='hi' OR a=1");

console.log(parsed);
