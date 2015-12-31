(function() {
  "use strict";
  angular
    .module('game')
    .factory('GameService', function($http) {
      
      return {
        getGame: getGame,
      };
    });
})();
