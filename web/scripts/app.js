var SirenRouteProvider = function() {
  var routes = {};

  this.when = function(klass, route) {
    klass = klass.join(' ');
    routes[klass] = route;

    return this;
  };

  this.otherwise = function(params) {
    return this.when(null, params);
  };

  this.$get = ['$rootScope', '$q', '$injector', '$http', '$templateCache', 
    function($rootScope, $q, $injector, $http, $templateCache) {
    var forceReload = false,
        entityRoute = {
          routes: routes,

          reload: function() {
            forceReload = true;
            $rootScope.$evalAsync(updateRoute);
          }
        };

      $rootScope.$on('entityChangeSuccess', updateRoute);
      return entityRoute;

      function updateRoute(e, entity) {
        console.log('in updateRoute!');
        var next = parseRoute(entity),
            last = entityRoute.current;

        console.log('entity:', entity);
        console.log('next:', next);
        console.log('last:', last);
        if (next && last && next.$entityRoute === last.$entityRoute
            && angular.equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
          last.params = next.params;
          console.log('next && last');
          $rootScope.$broadcast('entityUpdate', last);
        } else if (next || last) {
          console.log('next || last');
          forceReload = false;
          $rootScope.$broadcast('entityChangeStart', next, last);
          entityRoute.current = next;

          console.log('typeof next:', typeof(next));

          $q.when(next).
            then(function() {
              if (next) {
                var locals = angular.extend({}, next.resolve),
                    template;

                angular.forEach(locals, function(value, key) {
                  locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value);
                });

                if (angular.isDefined(template = next.template)) {
                  console.log('template');
                  if (angular.isFunction(template)) {
                    template = template(next.params);
                  }
                } else if (angular.isDefined(template = next.templateUrl)) {
                  console.log('templateUrl');
                  if (angular.isFunction(template)) {
                    template = template(next.params);
                  }
                  if (angular.isDefined(template)) {
                    next.loadedTemplateUrl = template;
                    template = $http.get(template, {cache: $templateCache}).
                        then(function(response) { return response.data; });
                  }
                }
                if (angular.isDefined(template)) {
                  locals['$template'] = template;
                }
                console.log('locals $template', locals['$template']);
                return $q.all(locals);
              }
            }).
            // after route change
            then(function(locals) {
              if (next == entityRoute.current) {
                if (next) {
                  next.locals = locals;
                  //copy(next.params, $routeParams);
                }
                //$rootScope.$broadcast('entityChangeSuccess', next, last);
              }
            }, function(error) {
              if (next == entityRoute.current) {
                $rootScope.$broadcast('entityChangeError', next, last, error);
              }
            });
        }
      }


      /**
       * @returns the current active route, by matching it against the URL
       */
      function parseRoute(entity) {
        // Match a route
        var match;
        if (entity && entity.class) {
          var klass = entity.class.join(' ');
          match = routes[klass];
          match.$entityRoute = match;
        }

        // No route matched; fallback to "otherwise" route
        return match || routes[null];
      }

      /**
       * @returns interpolation of the redirect path with the parameters
       */
      function interpolate(string, params) {
        var result = [];
        forEach((string||'').split(':'), function(segment, i) {
          if (i == 0) {
            result.push(segment);
          } else {
            var segmentMatch = segment.match(/(\w+)(.*)/);
            var key = segmentMatch[1];
            result.push(params[key]);
            result.push(segmentMatch[2] || '');
            delete params[key];
          }
        });
        return result.join('');
      }
      function updateView(entity) {
        var route;
        if (!entity || !entity.class) {
          route = routes[null];
        } else {
          var klass = entity.class.join(' ');
          route = routes[klass];
        }

        var template = $http.get(route.templateUrl, { cache: $templateCache })
          .success(function(data) {
            return data;
          });
      }
  }];
};

angular
  .module('surface', ['entity'])
  .provider('sirenRoute', SirenRouteProvider)
  .config(['sirenRouteProvider', function(sirenRouteProvider) {
    sirenRouteProvider.when(['home'], {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });
    sirenRouteProvider.when(['search-results'], {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl'
    });
  }])
  .directive('sirenView', sirenViewDirective)
  .controller('MainCtrl', ['$scope', '$location', 'siren', SurfaceCtrls.MainCtrl])
  .controller('HomeCtrl', ['$scope', '$location', 'siren', SurfaceCtrls.HomeCtrl])
  .controller('SearchCtrl', ['$scope', '$location', 
      'entityParams', SurfaceCtrls.SearchCtrl])
  .factory('appParams', function() {
    return { entity: {}, url: '' };
  })
  .factory('homeParams', function() {
    return { url: '' };
  })
  .factory('searchParams', function() {
    return { collection: '', query: '' };
  });
