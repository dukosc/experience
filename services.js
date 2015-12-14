(function () {
  "use strict";
  angular
    .module('experience')
    .factory('GoalsService', function ($http) {
      var url = 'http://tiny-tiny.herokuapp.com/collections/experience';

      var addGoal = function (newGoal) {
        $http.post(url, newGoal).then(function (res) {
          console.log(res);
        });
      };

      var getGoals = function () {
        return $http.get(url);
      };

      return {
        createGoal: addGoal,
        getGoals: getGoals
      };
    });
    var removeGoals = function(goals){
                 $http.delete(url+'/'+goals._id);
               };
})();
