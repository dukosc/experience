(function () {
  "use strict";

  angular.module('game')
    .controller('GameWindowController', function ($scope) {
      angular.element($('#game-window').show());
  });

})();
