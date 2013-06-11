angular
  .module('surface', ['ui.state', 'entity'])
  .config(['sirenStateProvider', function(sirenState) {
    sirenState
      .map(['home'], 'home')
      .map(['search-results'], 'search');
  }])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('index', {
        url: '',
        templateUrl: 'partials/start.html',
        controller: 'MainCtrl'
      })
      .state('home', {
        url: '/home?url',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .state('search', {
        url: '/search?url&collection&query',
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      });
  }])
  .controller('MainCtrl', ['$scope', '$state', 'siren', 'appParams', SurfaceCtrls.MainCtrl])
  .controller('HomeCtrl', ['$scope', '$state', 'siren', 'homeParams', SurfaceCtrls.HomeCtrl])
  .controller('SearchCtrl', ['$scope', '$state', 'siren',
      'entityParams', SurfaceCtrls.SearchCtrl])
  .factory('appParams', function() {
    return { entity: {}, url: '' };
  })
  .factory('homeParams', function() {
    return { url: '', collection: '', query: '' };
  });
