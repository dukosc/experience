(function() {

    angular.module('vgoals')
      .controller('ViewGoalsController', function($scope, $route, $rootScope, ViewGoalsService) {
          var vm = this;
          vm.putCompGoal = function(user){
            ViewGoalsService.emit('complete:goal', user);
          }
          ViewGoalsService.on('all:users', function(data) {
            var user = JSON.parse(localStorage.getItem('user'));
            var getStats = function(){
              for (var i in data) {
                if (user._id === data[i]._id) {
                  return data[i].stats;
                };
              }
            }
            vm.stats = getStats();
          });
          vm.completeGoal = function(user, goal) {
            compGoal = {
              activity: goal.activity,
              interval: goal.interval
            };
            user = JSON.parse(localStorage.getItem('user'));
            user.stats = vm.stats;
            user.svalue = 0;
            user.evalue = 0;
            user.dvalue = 0;
            user.ivalue = 0;
            user.wvalue = 0;
            if(compGoal.activity === "push-ups" || compGoal.activity === "squats" || compGoal.activity === "sit-ups"){
              if(compGoal.interval === "25"){
                user.svalue = 1;
              }
              if(compGoal.interval === "50"){
                user.svalue = 3;
              }
              if(compGoal.interval === "100"){
                user.svalue = 7;
              }
            }
            if(compGoal.activity === "run" || compGoal.activity === "bike" || compGoal.activity === "aerobic"){
              if(compGoal.interval === "15 min"){
                user.evalue = 1;
              }
              if(compGoal.interval === "30 min"){
                user.evalue = 3;
              }
              if(compGoal.interval === "1 hour"){
                user.evalue = 7;
              }
            }
            if(compGoal.activity === "burpees" || compGoal.activity === "jumping jacks" || compGoal.activity === "heisman"){
              if(compGoal.interval === "10"){
                user.evalue = 1;
              }
              if(compGoal.interval === "25"){
                user.evalue = 3;
              }
              if(compGoal.interval === "50"){
                user.evalue = 7;
              }
            }
            if(compGoal.activity === "read" || compGoal.activity === "practice music" || compGoal.activity === "puzzle"){
              if(compGoal.interval === "15 min"){
                user.evalue = 1;
              }
              if(compGoal.interval === "30 min"){
                user.evalue = 3;
              }
              if(compGoal.interval === "1 hour"){
                user.evalue = 7;
              }
            }
            if(compGoal.activity === "meditate" || compGoal.activity === "study" || compGoal.activity === "rest"){
              if(compGoal.interval === "15 min"){
                user.evalue = 1;
              }
              if(compGoal.interval === "30 min"){
                user.evalue = 3;
              }
              if(compGoal.interval === "1 hour"){
                user.evalue = 7;
              }
            }
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
            var getCompGoals = function(){
              for (var i in data) {
                if (user._id === data[i]._id) {
                  return data[i].completedGoals;
                };
              }
            }
            var getStats = function(){
              for (var i in data) {
                if (user._id === data[i]._id) {
                  return data[i].stats;
                };
              }
            }
            vm.completedGoals = getCompGoals();
            vm.stats = getStats();
          });
          console.log(vm);
        });
})();
