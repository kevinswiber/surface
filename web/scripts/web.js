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
