angular
  .module('entity', [])
  .controller('MainEntityCtrl',
      ['$scope', '$http', 'entityParams', EntityCtrls.MainEntityCtrl])
  .factory('entityParams', function() {
    return { url: '' };
  });
