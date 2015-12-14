
(function () {


  angular.module('experience')
    .controller('MainController', function ($scope) {
      angular.element($('canvas').hide());
      angular.element($('#game-window').hide());
  });

  angular.module('experience')
    .controller('GameWindowController', function ($scope) {
      angular.element($('canvas').show());
  });

  angular.module('experience')
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
