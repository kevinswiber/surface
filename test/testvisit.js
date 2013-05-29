var couchdb = require('../couchdb');

var visitor = couchdb({ uri: 'http://localhost:5984/kweeri' });
visitor.exec('select first_name, last_name where not first_name="Kevin" order by last_name desc, first_name asc', function(err, res, body) {
  console.log(err);
  console.log(JSON.stringify(body));
});
