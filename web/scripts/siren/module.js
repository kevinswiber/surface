angular
  .module('siren', ['ui.state'])
  .controller('SirenEntityCtrl',
      ['$scope', '$http', 'navigator', 'apiState', SirenCtrls.SirenEntityCtrl])
  .factory('apiState', function() {
    return { url: '', entity: {} };
  })
  .provider('classRouter', function() {
      var map = {};

      this.when = function(klass, state) {
        var c = klass.sort().join(' ');
        map[c] = state;
        return this;
      };
      
      this.otherwise = function(state) {
        map[null] = state;
      };

      this.$get = function() {
        return {
          resolve: function(klass) {
            var c = klass.sort().join(' ');
            return map[c] || map[null];
          }
        };
      };
  })
  .factory('navigator', ['$http', '$rootScope', '$q', '$state', 'classRouter', 'apiState',
      function($http, $rootScope, $q, $state, classRouter, apiState) {
    return {
      cache: [],
      current: null,
      fetch: function(url, params) {
        apiState.url = url;
        apiState.params = params;

        if (this.cache.length) {
          this.current = this.cache.pop();
          apiState.entity = this.current;
          return $q.when(this.current);
        }

        return this.transitionTo(url, params, true);
      },
      transitionTo: function(url, params, avoidCache) {
        if (typeof url === 'object' && url.href) {
          url = url.href;
        }

        var self = this;
        var deferred = $q.defer();

        apiState.url = url;
        apiState.params = params;

        $http.get(url).success(function(data, status, headers, config) {
          apiState.entity = data;

          if (!avoidCache) {
            self.cache.push(data);
            self.current = data;
          }

          $rootScope.$broadcast('entityChangeSuccess', data);

          var state = classRouter.resolve(data.class);

          $state.transitionTo(state, params);
          deferred.resolve(data);
        });

        return deferred.promise;
      }
    };
  }]);
