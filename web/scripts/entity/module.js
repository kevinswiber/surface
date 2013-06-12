angular
  .module('entity', ['ui.state'])
  .controller('MainEntityCtrl',
      ['$scope', '$http', 'siren', 'entityParams', EntityCtrls.MainEntityCtrl])
  .factory('entityParams', function() {
    return { url: '', entity: {} };
  })
  .provider('sirenState', function() {
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
  .factory('siren', ['$http', '$rootScope', '$q', '$state', 'sirenState', 'entityParams',
      function($http, $rootScope, $q, $state, sirenState, entityParams) {
    return {
      cache: [],
      current: null,
      fetch: function(url, params) {
        entityParams.url = url;
        entityParams.params = params;

        if (this.cache.length) {
          this.current = this.cache.pop();
          entityParams.entity = this.current;
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

        entityParams.url = url;
        entityParams.params = params;

        $http.get(url).success(function(data, status, headers, config) {
          entityParams.entity = data;

          if (!avoidCache) {
            self.cache.push(data);
            self.current = data;
          }

          $rootScope.$broadcast('entityChangeSuccess', data);

          var state = sirenState.resolve(data.class);

          $state.transitionTo(state, params);
          deferred.resolve(data);
        });

        return deferred.promise;
      }
    };
  }]);
