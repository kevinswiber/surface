angular
  .module('surface', ['ui.state', 'entity'])
  .config(['sirenStateProvider', function(sirenState) {
    sirenState
      .when(['home'], 'home')
      .otherwise('entity');
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
      .state('entity', {
        url: '/entity?url&collection&query',
        templateUrl: 'partials/entity.html',
        controller: 'EntityCtrl'
      });
  }])
  .controller('MainCtrl', ['$scope', '$state', 'siren', 'appState', SurfaceCtrls.MainCtrl])
  .controller('HomeCtrl', ['$scope', '$state', 'siren', 'appState', SurfaceCtrls.HomeCtrl])
  .controller('EntityCtrl', ['$scope', '$state', 'siren',
      SurfaceCtrls.EntityCtrl])
  .factory('appState', function() {
    return { url: '', collection: '', query: '' };
  })
  .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
  });
