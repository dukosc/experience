(function() {

  angular.module('goals')
    .controller('GoalsController', function($scope, $rootScope, GoalsService) {
      var vm = this;
      vm.putGoal = function(user){
        GoalsService.emit('new:goal', user);
        vm.newGoal = "";
      };
      vm.addGoal = function(user, goal) {
        console.log(goal);
        user = $rootScope.user;
        user.currGoals.push(goal);
        vm.putGoal(user);
        console.log(user);
        vm.newGoal = "";
      };
      //     GoalsService.getGoals().success(function (goals) {
      //       var vm = this;
      //       $scope.myGoals = goals;
      //       console.log($rootScope.user);
      //       $scope.addGoal = function(newGoal){
      //         GoalsService.createGoal(newGoal);
      //       };
      // });

    });

})();
