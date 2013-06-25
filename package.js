var url = require('url');

var SurfacePackage = function(options) {
  this.collections = options.collections;
  this.baseUri = options.href;
  this.driver = options.driver;

  if (this.baseUri.slice(-1) !== '/') {
    this.baseUri = this.baseUri + '/';
  }
};

SurfacePackage.prototype.build = function() {
  var self = this;
  return function(proxy) {
    this.proxy = proxy;
    return {
      name: 'Surface',
      install: self._install(proxy)
    };
  };
};

SurfacePackage.prototype._install = function(proxy) {
  var self = this;
  return function() {
    proxy.use(function(handle) {
      handle('request', function(env, next) {
        if (self.driver.initialize) {
          self.driver.initialize(env, function(driver) {
            env.surface = { driver: driver };
            next(env);
          })
        } else {
          env.surface = { driver: self.driver };
          next(env);
        }
      });
    });

    proxy.get('/?', function(handle) {
      handle('request', function(env, next) {
        if (env.response.statusCode.toString()[0] === '3') {
          return next(env);
        }
        var query = url.parse(env.request.url, true).query;
        if (query.collection) {
          if (!~self.collections.indexOf(query.collection)) {
            env.response.statusCode = 404;
            return next(env);
          }

          var location = self.baseUri + encodeURIComponent(query.collection);
          if (query.query) {
            location = location + '?query=' + encodeURIComponent(query.query);
          }

          env.response.statusCode = 303;
          env.response.setHeader('Location', location);
          next(env);
        } else {
          env.statusCode = 404;
          next(env);
        }
      });
    });

    proxy.get('/', function(handle) {
      handle('request', function(env, next) {
        if (env.response.statusCode.toString()[0] === '3') {
          return next(env);
        }
        var entities = self.collections.map(function(collection) {
          return {
            properties: { name: collection },
            class: ['collection'],
            rel: ['collection', 'item'],
            href: self.baseUri + encodeURIComponent(collection)
          };
        });

        var response = {
          class: ['home'],
          entities: entities,
          actions: [
            {
              name: 'search',
              href: self.baseUri,
              fields: [
                { name: 'collection', type: 'radio', value: self.collections },
                { name: 'query' }
              ]
            }
          ]
        };

        env.response.status = 200;
        env.response.setHeader('Content-Type', 'application/vnd.siren+json');
        env.response.body = response;
        next(env);
      });
    });

    self.collections.forEach(function(collection) {
      collection = encodeURIComponent(collection);
      proxy.get('/' + collection, self._collectionHandler(collection));
    });
  };
};

SurfacePackage.prototype._collectionHandler = function(collection) {
  var self = this;
  return function(handle) {
    handle('request', function(env, next) {
      if (env.response.statusCode.toString()[0] === '3') {
        return next(env);
      }
      var ql, id;
      var isCollection = true;
      var isFullCollection = false;

      if (env.request.url.split('/').length > 2) {
        isCollection = false;
        id = env.request.url.split('/')[2];
        if (!id) {
          env.response.statusCode = 404;
          return next(env);
        }
      } else {
        isCollection = true;
        var query = url.parse(env.request.url, true).query;
        ql = query.query;
        isFullCollection = !ql;
      }

      var collectionPath = collection + '/';

      var cb = function(err, body) {
        if (body) {
          if (typeof body === 'string') body = JSON.parse(body);
          if (isCollection) {
            body = self._sirenify(self.baseUri, self.baseUri + env.request.url.slice(1), collectionPath, body, ql, isFullCollection);
          } else if (body.rows[0]) {
            var item = body.rows[0];
            body = self._sirenifyItem(self.baseUri, collectionPath, item);
            delete body.rel;
          }
        }

        env.response.setHeader('Content-Type', 'application/vnd.siren+json');
        env.response.body = body;
        next(env);
      };

      if (isCollection) {
        env.surface.driver.find(collection, ql, cb);
      } else {
        env.surface.driver.findOne(collection, id, cb);
      }
    });
  };
};


SurfacePackage.prototype._sirenify = function(baseUri, url, collectionPath, body, ql, isFullCollection) {
  if (!body) return body;

  var skeleton = {
    class: [isFullCollection ? 'collection' : 'search-results'],
    properties: {},
    entities: [],
    links: []
  };

  skeleton.links.push({ rel: ['self'], href: url });
  skeleton.links.push({ rel: ['collection'], href: baseUri });

  if (isFullCollection) {
    skeleton.properties.name = collectionPath.slice(0, -1);
  } else {
    skeleton.properties.collection = collectionPath.slice(0, -1);
    skeleton.properties.query = ql;
    skeleton.properties.timestamp = new Date().getTime();
  }

  skeleton.properties.count = body.count || 0;

  if (!body.rows) return skeleton;

  var self = this;
  body.rows.forEach(function(row) {
   var entity = self._sirenifyItem(baseUri, collectionPath, row);
   skeleton.entities.push(entity);
  });

  return skeleton;
};

SurfacePackage.prototype._sirenifyItem = function(baseUri, collectionPath, row) {
   var entity = { 
     class: [],
     rel: ['item'],
     properties: {},
     links: []
   };

   entity.links.push({ rel: ['self'], href: baseUri + collectionPath + row.id });
   entity.links.push({ rel: ['collection'], href: baseUri + collectionPath.slice(0, -1) });

   Object.keys(row.value).forEach(function(prop) {
     entity.properties[prop] = row.value[prop];
   });

   if (row.type) {
     entity.class.push(row.type);
   }

   return entity;
};

module.exports = function(config) {
  var p = new SurfacePackage(config);
    
  return { package: p.build() };
};
