var url = require('url');
var argo = require('argo');
var conf = require('./surface.conf');
var visitor = require('../' + conf.type);

var collections = conf.collections;
var databaseUri = conf.db;
var baseUri = conf.href;
var relUri = conf.rel;

var proxy = argo();

proxy.use(function(handle) {
  handle('response', function(env, next) {
    env.response.setHeader('Access-Control-Allow-Origin', '*');
    next(env);
  });
});

collections.forEach(function(collection) {
  collection = encodeURIComponent(collection);
  proxy.get('/' + collection, function(handle) {
    handle('request', function(env, next) {
      var ql;
      var isCollection = true;

      if (env.request.url.split('/').length > 2) {
        isCollection = false;
        var id = env.request.url.split('/')[2];
        if (!id) {
          env.response.statusCode = 404;
          return next(env);
        }
        ql = 'select * where _id="' + id + '"';
      } else {
        isCollection = true;
        var query = url.parse(env.request.url, true).query;
        ql = query.ql || 'select * where _id > "0"';
      }

      var collectionPath = collection + '/';
      var queryRunner = visitor({ uri: databaseUri + collectionPath });
      queryRunner.exec(ql, function(err, res, body) {
        if (body) {
          if (typeof body === 'string') body = JSON.parse(body);
          if (isCollection) {
            body = sirenify(baseUri + env.request.url.slice(1), collectionPath, body);
          } else if (body.rows[0]) {
            var item = body.rows[0];
            body = sirenifyItem(collectionPath, item);
            delete body.rel;
          }
        }

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
   var entity = sirenifyItem(collectionPath, row);
   if (row.value.type) {
     entity.rel.push(relUri + row.value.type);
   }
   skeleton.entities.push(entity);
  });

  return skeleton;
};

var sirenifyItem = function(collectionPath, row) {
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
     entity.class.push(row.value.type);
   }

   return entity;
};
var sirenifyEdit = function(url, body) {
  if (!body) return body;
  if (typeof body === 'string') body = JSON.parse(body);
  var skeleton = { properties: {}, entities: [], links: [] };
  return skeleton;
};
