(function() {
  "use strict";
  angular
    .module('stats')
    .factory('StatsService', function($http) {
      var url = 'http://tiny-tiny.herokuapp.com/collections/experience';
      var getStats = function() {
        console.log($http.get(url));
        return $http.get(url);
      };
      return {
        getStats: getStats,
      };
    });
})();
