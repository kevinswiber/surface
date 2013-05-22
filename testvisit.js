var couchdb = require('./couchdb');

var visitor = couchdb({ uri: 'http://localhost:5984/kweeri' });
visitor.exec('select last_name where not first_name="Kevin"', function(err, res, body) {
  console.log(err);
  console.log(body);
});
