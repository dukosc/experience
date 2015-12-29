(function() {

    angular.module('vgoals')
      .controller('ViewGoalsController', function($scope, $route, $rootScope, ViewGoalsService) {
          var vm = this;
          vm.putCompGoal = function(user){
            ViewGoalsService.emit('complete:goal', user);
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
          ViewGoalsService.on('all:users', function(data) {
            var user = JSON.parse(localStorage.getItem('user'));
            // console.log(user);
            // console.log(data);
            var getGoals = function(){
              for (var i in data) {
                if (user._id === data[i]._id) {
                  console.log(data[i].currGoals);
                  return data[i].currGoals;
                };
              }
            }
            vm.goals = getGoals();
          });
          ViewGoalsService.on('all:users', function(data) {
            var user = JSON.parse(localStorage.getItem('user'));
            // console.log(user);
            // console.log(data);
            var getCompGoals = function(){
              for (var i in data) {
                if (user._id === data[i]._id) {
                  console.log(data[i].completedGoals);
                  return data[i].completedGoals;
                };
              }
            }
            vm.completedGoals = getCompGoals();
          });
          console.log(vm);
        });
})();
