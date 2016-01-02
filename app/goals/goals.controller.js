(function() {

  angular.module('goals')
    .controller('GoalsController', function($scope, $rootScope, GoalsService) {
      var vm = this;
      $rootScope.visited = false;
      console.log($rootScope.visited);
      vm.addGoal = function(user, goal) {
        console.log(goal);
        user = JSON.parse(localStorage.getItem('user'));
        user.currGoals.push(goal);
        GoalsService.emit('new:goal', user);
        console.log(user);
      };
    });
})();
