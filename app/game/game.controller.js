(function () {
  "use strict";
  
  angular.module('game')
    .controller('GameWindowController', function ($scope) {
      angular.element($('canvas').show());
  });

})();
