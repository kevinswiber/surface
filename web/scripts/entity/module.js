angular
  .module('entity', [])
  .controller('MainEntityCtrl',
      ['$scope', '$http', 'entityParams', EntityCtrls.MainEntityCtrl])
  .factory('entityParams', function() {
    return { url: '' };
  })
  .factory('siren', ['$http', '$rootScope', function($http, $rootScope) {
    return {
      current: null,
      fetch: function(url) {
        if (typeof url === 'object' && url.href) {
          url = url.href;
        }

        var self = this;
        $http.get(url).success(function(data, status, headers, config) {
          //appParams.entity = data;
          //console.log(data);
          self.current = data;
          console.log('self.current', self.current)
          console.log('broadcasting entityChangeSuccess');
          $rootScope.$broadcast('entityChangeSuccess', data);
        });
      }
    };
  }]);
