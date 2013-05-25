angular
  .module('surface', ['entity'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {
      templateUrl: 'partials/collection.html',
      controller: 'MainEntityCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  }])
  .controller('MainCtrl', ['$scope', '$location',
      'entityParams', SurfaceCtrls.MainCtrl]);
