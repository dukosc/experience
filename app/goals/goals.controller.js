(function(){

  angular.module('goals')
    .controller('GoalsController', function ($scope, GoalsService) {

      GoalsService.getGoals().success(function (goals) {
        console.log(goals);
        $scope.myGoals = goals;

        $scope.addGoal = function(newGoal){
          GoalsService.createGoal(newGoal);
        };
  });

});

})();
