var SirenExplorer = function() { };

SirenExplorer.prototype.addProperties = function($parent, entity) {
  if (!entity.properties) return;
  var $properties = $('<dl/>').addClass('properties');
  $.each(Object.keys(entity.properties), function(idx, prop) {
    $('<dt/>').text(prop).appendTo($properties);
    $('<dd/>').text(entity.properties[prop]).appendTo($properties);
  });
  var $div = $('<div/>');
  $div.append($('<h4/>').text('Properties'));
  $div.append($properties);
  $parent.append($div);
};

SirenExplorer.prototype.addEntities = function($parent, entity) {
  if (!entity.entities || !entity.entities.length) return;
  var $entities = $('<ul/>');
  var self = this;
  $.each(entity.entities, function(idx, entity) {
    var $entity = $('<li/>');
    var $properties = $('<ul/>');
    var $links = $('<ul/>');

    self.addProperties($properties, entity);
    self.addLinks($links, entity);

    $entity.append($properties);
    $entity.append($links);
    $entities.append($entity);
  });

  var $div = $('<div/>');
  $div.append($('<h4/>').text('Entities'));
  $div.append($entities);
  $parent.append($div);
};

SirenExplorer.prototype.addActions = function($parent, entity) {
  if (!entity.actions || !entity.actions.length) return;
};

SirenExplorer.prototype.addLinks = function($parent, entity) {
  if (!entity.links || !entity.links.length) return;
  var $links = $('<ul/>');
  $.each(entity.links, function(idx, link) {
    $.each(link.rel, function(idx, rel) {
      $('<li/>').html('<a href="#entity-modal" data-toggle="modal" data-href="' + link.href + '" class="entity-link ' + rel + '">' + rel + '</a>').appendTo($links);
    });
  });

  var $div = $('<div/>');
  $div.append($('<h4/>').text('Links'));
  $div.append($links);
  $parent.append($div);
};

var MainEntityController = function($scope, $http) {
  // TODO: Remove
  $scope.rootUrl = 'http://localhost:3000';
  $scope.collection = 'kweeri';
  $scope.query = 'select * where first_name="Kevin"';
  ////////////////
  
  $scope.properties = [];
  $scope.entities = [];
  $scope.actions = [];
  $scope.links = [];

  $scope.fetch = function() {
    //$('#properties,#links,#actions,#entities').empty();

    $scope.properties = [];
    $scope.entities = [];
    $scope.actions = [];
    $scope.links = [];

    var rootUrl = $scope.rootUrl;
    var collection = $scope.collection;
    var query = $scope.query;

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

    $http.get(url).success(function(data, status, headers, config) {
      if (typeof data === 'string') data = JSON.parse(data);

      angular.forEach(data.properties, function(value, key) {
        $scope.properties.push({ key: key, value: value });
      });

      if (data.entities) {
        $scope.entities = data.entities;
      };

      if (data.links) {
        angular.forEach(data.links, function(link) {
          angular.forEach(link.rel, function(rel) {
            $scope.links.push({ rel: rel, href: link.href });
          });
        });
      }

      var explorer = new SirenExplorer();
      //explorer.addProperties($('#properties'), data);
      explorer.addEntities($('#entities'), data);
      //explorer.addLinks($('#links'), data);

      /*$('.entity-link').on('click', function(e) {
        e.preventDefault();

        var url = $(this).attr('data-href');

        $http.get(url).success(function(data, status, headers, config) {
          console.log(status);
          console.log(data);
          if (typeof data === 'string') data = JSON.parse(data);
          $('#modal-properties,#modal-links,#modal-actions,#modal-entities').empty();
          var explorer = new SirenExplorer();
          explorer.addProperties($('#modal-properties'), data);
          explorer.addEntities($('#modal-entities'), data);
          explorer.addLinks($('#modal-links'), data);
        });
        return true;
      });*/
    });
  };
};

var ModalEntityController = function($scope, $http) {
  $scope.fetch = function() {
    var url = $scope.href;//$(this).attr('data-href');

    $http.get(url).success(function(data, status, headers, config) {
      console.log(status);
      console.log(data);
      if (typeof data === 'string') data = JSON.parse(data);
      $('#modal-properties,#modal-links,#modal-actions,#modal-entities').empty();
      var explorer = new SirenExplorer();
      explorer.addProperties($('#modal-properties'), data);
      explorer.addEntities($('#modal-entities'), data);
      explorer.addLinks($('#modal-links'), data);
    });
  };
};
