var query = require('../query');
var Ast = require('../ast');

query.parser.yy = Ast;

var parsed;

var statement = process.argv[2] || "SELECT [h\\]ot dogs], first_name, last_name, favorite_food, of, contains, within, [where] WHERE where=0 and [or]=3 and name eq 'Ke\\'vin' AND NOT location.coordinates within .5 of 40.042016, -86.900749 AND NOT id=2 && NOT name contains 'foo%' && of='hi' OR a=1 ORDER BY name DESC, first_name ASC";

parsed = query.parse(statement);

console.log(parsed);
