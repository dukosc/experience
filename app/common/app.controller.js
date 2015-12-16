(function () {
  "use strict";

  angular.module('experience')
    .controller('MainController', function ($scope) {
      angular.element($('canvas').hide());
      angular.element($('#game-window').hide());
  });

})();
