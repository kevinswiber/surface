var SurfaceCtrls = {};

SurfaceCtrls.MainCtrl = function($scope, $location, siren) {
  var search = $location.search();
  var url;
  if (search.url) {
    url = search.url
  }

  console.log('in MainCtrl:', url);
  if (url) {
    siren.fetch(url);
  }

  $scope.init = function() {
    $scope.params = { rootUrl: url || 'http://localhost:3000' };
  };

  $scope.fetchHome = function(params) {
    console.log('in fetch home');
    $location.path('/');
    $location.search({ url: params.rootUrl });
    siren.fetch(params.rootUrl);
    console.log('siren.current', siren.current);
  };
};

SurfaceCtrls.HomeCtrl = function($scope, $location, siren) {
  $scope.init = function() {
    $scope.model = {};//searchParams;
    $scope.fields = {};

    $scope.model.url = $location.search().url;
    //$scope.model.url = homeParams.url;

    var data = siren.current;
    console.log(data);
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

    //searchParams.collection = $scope.model.collection;
    //searchParams.query = $scope.model.query;
    //console.log(searchParams);
  };

  $scope.search = function(params) {
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

    $location.path('/');
    $location.search({ url: url });
    siren.fetch(url);
  };
};

SurfaceCtrls.SearchCtrl = function($scope, $location, entityParams) {
  $scope.init = function() {
    console.log('search init');
    var search = $location.search();
    if (!entityParams.url && (!search || !search.url)) {
      $location.path('/');
      return;
    } else if (!entityParams.url && search && search.url) {
      entityParams.url = search.url;
    }
  };
};
