(function() {
  "use strict";
  angular
    .module('game')
    .factory('GameService', function($http) {
      var url = 'http://tiny-tiny.herokuapp.com/collections/experience';
      var getGame = function() {
        console.log($http.get(url));
        return $http.get(url);
      };
      return {
        getGame: getGame,
      };
    });
})();
