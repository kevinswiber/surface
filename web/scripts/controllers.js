var SurfaceCtrls = {};

SurfaceCtrls.MainCtrl = function($scope, $state, siren, appParams) {
  $scope.init = function() {
    $scope.params = { url: appParams.url || '' };
  };

  $scope.fetchUrl = function(params) {
    var url = params.url;
    appParams.url = url;
    siren.transitionTo(url, { url: url });
  };
};

SurfaceCtrls.HomeCtrl = function($scope, $state, siren, homeParams) {
  $scope.init = function() {
    $scope.model = { collection: null, query: null };
    $scope.fields = {};

    $scope.model.url = $state.params.url;

    if (!$scope.model.url || $scope.model.url === homeParams.url) {
      $scope.model.url = homeParams.url;
      $scope.model.collection = homeParams.collection;
      $scope.model.query = homeParams.query;
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
    var rootUrl = homeParams.url = params.url;
    var collection = homeParams.collection = params.collection;
    var query = homeParams.query = params.query;

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

SurfaceCtrls.SearchCtrl = function($scope, $state, siren, entityParams) {
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

    entityParams.params = params;
    entityParams.url = url;
    siren.fetch(url, params).then(function(data) {
      entityParams.entity = data;
    });
  };
};
