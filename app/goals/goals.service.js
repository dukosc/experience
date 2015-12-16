(function() {
  "use strict";
  angular
    .module('goals')
    .factory('GoalsService', function($http) {
      var url = 'http://tiny-tiny.herokuapp.com/collections/experience';
      var getGoals = function() {
        console.log($http.get(url));
        return $http.get(url);
      };
      return {
        getGoals: getGoals,
      };
    });
})();
