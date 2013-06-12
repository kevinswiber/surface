var SirenCtrls = {};

SirenCtrls.SirenEntityCtrl = function($scope, $http, navigator, apiState) {
  $scope.url = apiState.url;

  $scope.init = function() {
    $scope.main = {
      properties: [],
      entities: [],
      actions: [],
      links: []
    };

    navigator.fetch(apiState.url, apiState.params).then(function(data) {
      showData(data);
    });

    function showData(data) {
      if (typeof data === 'string') data = JSON.parse(data);

      angular.forEach(data.properties, function(value, key) {
        $scope.main.properties.push({ key: key, value: value });
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

          $scope.main.entities.push(entity);
        });
      };

      if (data.links) {
        angular.forEach(data.links, function(link) {
          angular.forEach(link.rel, function(rel) {
            $scope.main.links.push({ rel: rel, href: link.href });
          });
        });
      }
    }
  };
};

