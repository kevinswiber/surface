var EntityCtrls = {};

EntityCtrls.MainEntityCtrl = function($scope, $http) {
  console.log('in main entity controller.');
  $scope.rootUrl = 'http://localhost:3000';
  $scope.collection = 'kweeri';
  $scope.query = 'select * where first_name="Kevin"';
  
  $scope.properties = [];
  $scope.entities = [];
  $scope.actions = [];
  $scope.links = [];

  $scope.fetch = function() {
    $scope.properties = [];
    $scope.entities = [];
    $scope.actions = [];
    $scope.links = [];

    var rootUrl = $scope.rootUrl;
    var collection = $scope.collection;
    var query = $scope.query;

    var url = '';
    if (rootUrl) {
      url += rootUrl;
    }
    if (collection) {
      if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
      }
      url += '/' + encodeURIComponent(collection);
    }
    if (query) {
      url += '?ql=' + encodeURIComponent(query);
    }

    $http.get(url).success(function(data, status, headers, config) {
      if (typeof data === 'string') data = JSON.parse(data);

      angular.forEach(data.properties, function(value, key) {
        $scope.properties.push({ key: key, value: value });
      });

      if (data.entities) {
        angular.forEach(data.entities, function(entity) {
          if (entity.properties) {
            var properties = []
            angular.forEach(entity.properties, function(value, key) {
              properties.push({ key: key, value: value });
            });

            entity.properties = properties;
          }

          if (entity.links) {
            var links = [];
            angular.forEach(entity.links, function(link) {
              angular.forEach(link.rel, function(rel) {
                links.push({ rel: rel, href: link.href });
              });
            });

            entity.links = links;
          }

          $scope.entities.push(entity);
        });
      };

      if (data.links) {
        angular.forEach(data.links, function(link) {
          angular.forEach(link.rel, function(rel) {
            $scope.links.push({ rel: rel, href: link.href });
          });
        });
      }
    });
  };
};

