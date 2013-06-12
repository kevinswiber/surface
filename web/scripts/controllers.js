var SurfaceCtrls = {};

SurfaceCtrls.MainCtrl = function($scope, $state, siren, appState) {
  $scope.init = function() {
    $scope.params = { url: appState.url || '' };
  };

  $scope.fetchUrl = function(params) {
    var url = params.url;
    appState.url = url;
    siren.transitionTo(url, { url: url });
  };
};

SurfaceCtrls.HomeCtrl = function($scope, $state, siren, appState) {
  $scope.init = function() {
    $scope.model = { collection: null, query: null };
    $scope.fields = {};

    $scope.model.url = $state.params.url;

    if (!$scope.model.url || $scope.model.url === appState.url) {
      $scope.model.url = appState.url;
      $scope.model.collection = appState.collection;
      $scope.model.query = appState.query;
    }

    siren.fetch($state.params.url, $state.params).then(function(data) {
      angular.forEach(data.actions, function(action) {
        if (action.name === 'search') {
          angular.forEach(action.fields, function(field) {
            $scope.fields[field.name] = field;
          });
        }
      });

      if (!$scope.model.collection || $scope.model.collection === '') {
        $scope.model.collection = $scope.fields.collection.value[0];
      }

      if (!$scope.model.query || $scope.model.query === '') {
        $scope.model.query = $scope.fields.query.value;
      }
    });
  };

  $scope.search = function(params) {
    var rootUrl = appState.url = params.url;
    var collection = appState.collection = params.collection;
    var query = appState.query = params.query;

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
      url += '?query=' + encodeURIComponent(query);
    }

    siren.transitionTo(url, { url: rootUrl, collection: collection, query: query });
  };
};

SurfaceCtrls.EntityCtrl = function($scope, $state, siren) {
  $scope.init = function() {
    var params = $state.params;
    var rootUrl = params.url;
    var collection = params.collection;
    var query = params.query;

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
      url += '?query=' + encodeURIComponent(query);
    }

    siren.fetch(url, params);
  };
};
