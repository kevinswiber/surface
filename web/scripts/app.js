angular
  .module('surface', ['ui.state', 'siren'])
  .config(['classRouterProvider', function(classRouterProvider) {
    classRouterProvider
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
  .controller('MainCtrl',
      ['$scope', '$state', 'navigator', 'appState', SurfaceCtrls.MainCtrl])
  .controller('HomeCtrl',
      ['$scope', '$state', 'navigator', 'appState', SurfaceCtrls.HomeCtrl])
  .controller('EntityCtrl',
      ['$scope', '$state', 'navigator', SurfaceCtrls.EntityCtrl])
  .factory('appState', function() {
    return { url: '', collection: '', query: '' };
  })
  .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
  });
