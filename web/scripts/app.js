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
            console.log('RELOADING');
            $rootScope.$evalAsync(updateRoute);
          }
        };

console.log('assigning root scope.');
      $rootScope.$on('entityChangeSuccess', updateRoute);
      return entityRoute;

      function updateRoute(e, entity) {
console.log('in updateRoute!');
        var next = parseRoute(entity),
            last = entityRoute.current;

        console.log(entity);
        console.log(next);
        console.log(last);
        if (next && last && next.$entityRoute === last.$entityRoute
            && angular.equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
          last.params = next.params;
          //angular.copy(last.params, $routeParams);
          $rootScope.$broadcast('entityUpdate', last);
        } else if (next || last) {
          forceReload = false;
          $rootScope.$broadcast('entityChangeStart', next, last);
          entityRoute.current = next;
          /*if (next) {
            if (next.redirectTo) {
              if (isString(next.redirectTo)) {
                $location.path(interpolate(next.redirectTo, next.params)).search(next.params)
                         .replace();
              } else {
                $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search()))
                         .replace();
              }
            }
          }*/

          $q.when(next).
            then(function() {
              if (next) {
                var locals = angular.extend({}, next.resolve),
                    template;

                angular.forEach(locals, function(value, key) {
                  locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value);
                });

                if (angular.isDefined(template = next.template)) {
                  if (angular.isFunction(template)) {
                    template = template(next.params);
                  }
                } else if (angular.isDefined(template = next.templateUrl)) {
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
console.log('configuring siren view provider');
    /*$routeProvider.when('/', {
      templateUrl: 'partials/start.html',
      controller: 'MainCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });*/
    sirenRouteProvider.when(['home'], {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });
    sirenRouteProvider.when(['search-results'], {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl'
    });
  }])
  /*.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });
    $routeProvider.when('/search', {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  }])*/
  .directive('sirenView', sirenViewDirective)
  .controller('MainCtrl', ['$scope', '$location',
      '$http', '$rootScope', '$templateCache', 'appParams', 'homeParams', SurfaceCtrls.MainCtrl])
  .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope',
      'homeParams', 'searchParams', 'entityParams', 'appParams', SurfaceCtrls.HomeCtrl])
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
