var SurfaceCtrls = {};

SurfaceCtrls.MainCtrl = function($scope, $location, $http, $rootScope, $templateCache, appParams, homeParams) {
  var search = $location.search();
  if (search.url) {
    appParams.url = search.url;
  }

  $scope.init = function() {
    var search = $location.search();
    if (search.url) {
      appParams.url = search.url;
    }

    console.log('running init');
    if (!appParams.url) {
      return;
    }

    console.log(appParams.url);

    $http.get(appParams.url).success(function(data, status, headers, config) {
      appParams.entity = data;
      console.log(data);
console.log('broadcasting entityChangeSuccess');
      $rootScope.$broadcast('entityChangeSuccess', appParams.entity);

      /*if (data.class) {
        var router = { 'home': 'partials/home.html' };
        angular.forEach(data['class'], function(klass) {
          if (router[klass]) {
            var cacheId = router[klass];
            var template = $templateCache.get(cacheId);
            //if (!template) {
              $http.get(cacheId).success(function(tmpl, status, headers, config) {
                //$templateCache.put(cacheId, tmpl);
                var compiled = $compile(tmpl)($scope);
                $('#view').html(compiled);
              });
            //}
          };
        });
      }*/
    });
  };

  $scope.params = {
    rootUrl: 'http://localhost:3000',
    route: '/search'
  };

  $scope.fetchHome = function(params) {
    homeParams.url = params.rootUrl;
    $location.path('/');
    $location.search({ url: homeParams.url });
    $scope.init();
  };
};

SurfaceCtrls.HomeCtrl = function($scope, $http, $location, $rootScope,
    homeParams, searchParams, entityParams, appParams) {
  $scope.model = searchParams;
  $scope.fields = {};

  $scope.init = function() {
console.log('home init');
    if (!homeParams.url) {
      if ($location.search().url) {
        homeParams.url = $location.search().url;
      }
    }

    $scope.model.url = homeParams.url;

    //$http.get(homeParams.url).success(function(data, status, headers, config) {
    console.log(appParams);
    var data = appParams.entity;
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

      searchParams.collection = $scope.model.collection;
      searchParams.query = $scope.model.query;
      console.log(searchParams);
    //});
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

    appParams.url = url;
    entityParams.url = url;
    $location.path('/search');
    $location.search({ url: url });
    $http.get(appParams.url).success(function(data, status, headers, config) {
      appParams.entity = data;
      console.log(data);
      console.log('broadcasting entityChangeSuccess');
      $rootScope.$broadcast('entityChangeSuccess', appParams.entity);
    });
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
