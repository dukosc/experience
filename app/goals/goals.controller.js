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
        user = JSON.parse(localStorage.getItem('user'));
        user.currGoals.push(goal);
        vm.putGoal(user);
        console.log(user);
        vm.newGoal = "";
      };
      vm.putCompGoal = function(user){
        GoalsService.emit('complete:goal', user);
      }
      vm.completeGoal = function(user, goal) {
        console.log(goal);
        compGoal = {
          activity: goal.activity,
          interval: goal.interval
        };
        user = JSON.parse(localStorage.getItem('user'));
        user.completedGoals.push(compGoal);
        vm.putCompGoal(user);
        console.log(user);
      }
      GoalsService.on('all:users', function(data) {
        var user = JSON.parse(localStorage.getItem('user'));
        for(var i in data){
          if(user._id === data[i]._id){
            vm.goals = data[i].currGoals;
          };
        }
      });
      console.log(vm);
});
})();
