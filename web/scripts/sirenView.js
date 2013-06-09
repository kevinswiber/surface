var sirenViewDirective = ['$http', '$templateCache', 'sirenRoute', '$anchorScroll', '$compile',
                       '$controller', '$animator',
               function($http,   $templateCache, sirenRoute,   $anchorScroll,   $compile,
                        $controller,  $animator) {
console.log('sirenviewdirective');
console.log(sirenRoute);
  return {
    restrict: 'ECA',
    terminal: true,
    link: function(scope, element, attr) {
      var lastScope,
          onloadExp = attr.onload || '',
          animate = $animator(scope, attr);

      scope.$on('entityChangeSuccess', update);
      update();


      function destroyLastScope() {
        if (lastScope) {
          lastScope.$destroy();
          lastScope = null;
        }
      }

      function clearContent() {
console.log('clearing content');
        animate.leave(element.contents(), element);
        destroyLastScope();
      }

      function update() {
console.log('on update');
        var locals = sirenRoute.current && sirenRoute.current.locals,
            template = locals && locals.$template;
console.log(sirenRoute.current);
console.log(locals);
console.log(template);

        if (template) {
          clearContent();
          var enterElements = $('<div></div>').html(template).contents();
          console.log('enter elements', enterElements);
          animate.enter(enterElements, element);
          console.log(element.children());

          var link = $compile(enterElements),
              current = sirenRoute.current,
              controller;

          lastScope = current.scope = scope.$new();
          console.log('current.controller', current.controller);
          if (current.controller) {
            locals.$scope = lastScope;
            controller = $controller(current.controller, locals);
            if (current.controllerAs) {
              lastScope[current.controllerAs] = controller;
            }
            element.children().data('$ngControllerController', controller);
          }

          link(lastScope);
          lastScope.$emit('$viewContentLoaded');
          lastScope.$eval(onloadExp);

          // $anchorScroll might listen on event...
          $anchorScroll();
        } else {
          clearContent();
        }
      }
    }
  };
}];

