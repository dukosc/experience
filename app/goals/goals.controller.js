(function(){

  angular.module('goals')
    .controller('GoalsController', function ($scope, $rootScope, GoalsService) {

      GoalsService.getGoals().success(function (goals) {
        console.log(goals);
        $scope.myGoals = goals;
        console.log($rootScope.user);
        $scope.addGoal = function(newGoal){
          GoalsService.createGoal(newGoal);
        };
  });

});

})();
