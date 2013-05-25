var SurfaceCtrls = {};

SurfaceCtrls.MainCtrl = function($scope, $location, entityParams) {
  var search = $location.search();
  if (search.url) {
    entityParams.url = search.url;
  }

  $scope.params = {
    rootUrl: 'http://localhost:3000',
    collection: 'kweeri',
    query: 'select * where first_name="Kevin"',
    route: '/search'
  };

  $scope.fetch = function(params) {
    var rootUrl = params.rootUrl;
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
      url += '?ql=' + encodeURIComponent(query);
    }

    entityParams.url = url;
    $location.path('/search');
    $location.search({ url: url });
  };
};
