var url = require('url');
var argo = require('argo');
var couch = require('./couchdb');

var collections = ['kweeri', 'alps', 'api-craft-conf-detroit2013'];
var databaseUri = 'http://localhost:5984/';
var baseUri = 'http://localhost:3000/';
var relUri = 'http://localhost:3000/rels/';

var proxy = argo();

collections.forEach(function(collection) {
  proxy.get('/' + encodeURIComponent(collection), function(handle) {
    handle('request', function(env, next) {
      var query = url.parse(env.request.url, true).query;
      var ql = query.ql || 'select * where [_id] > "0"';

      var collectionPath = encodeURIComponent(collection) + '/';
      var queryRunner = couch({ uri: databaseUri + collectionPath });
      queryRunner.exec(ql, function(err, res, body) {
        body = sirenify(baseUri + env.request.url.slice(1), collectionPath, body);

        env.response.setHeader('Content-Type', 'application/vnd.siren+json');
        env.response.body = body;
        next(env);
      });
    });
  });
});

proxy.listen(process.env.PORT || 3000);

var sirenify = function(url, collectionPath, body) {
  if (!body) return body;
  if (typeof body === 'string') body = JSON.parse(body);

 var skeleton = {
   class: ['search-results'],
   properties: {},
   entities: [],
   links: []
 };

 skeleton.links.push({ rel: ['self'], href: url });

 skeleton.properties.count = body.total_rows || 0;

 if (!body.rows) return skeleton;

 body.rows.forEach(function(row) {
   var entity = { 
     class: [],
     rel: [],
     properties: {},
     links: []
   };
   entity.links.push({ rel: ['self'], href: baseUri + collectionPath + row.id });
   entity.links.push({ rel: ['edit'], href: baseUri + collectionPath + row.id + '?edit' });
   Object.keys(row.value).forEach(function(prop) {
     entity.properties[prop] = row.value[prop];
   });

   if (row.value.type) {
     entity.rel.push(relUri + row.value.type);
     entity.class.push(row.value.type);
   }

   skeleton.entities.push(entity);
 });

 return skeleton;
};

var sirenifyEdit = function(url, body) {
  if (!body) return body;
  if (typeof body === 'string') body = JSON.parse(body);
  var skeleton = { properties: {}, entities: [], links: [] };
  return skeleton;
};
