(function() {

  angular.module('goals')
    .controller('GoalsController', function($scope, $location, $rootScope, GoalsService) {
      var vm = this;
      $rootScope.visited = false;
      vm.addGoal = function(user, goal) {
        console.log(goal);
        user = JSON.parse(localStorage.getItem('user'));
        user.currGoals.push(goal);
        GoalsService.emit('new:goal', user);
        $location.path('/add-goals')
      };
    });
})();
