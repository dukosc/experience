(function() {

    angular.module('vgoals')
      .controller('ViewGoalsController', function($scope, $rootScope, ViewGoalsService) {
          var vm = this;


          GoalsService.on('all:users', function(data) {
            var user = JSON.parse(localStorage.getItem('user'));
            // console.log(user);
            // console.log(data);
            for (var i in data) {
              if (user._id === data[i]._id) {
                // console.log(data[i].currGoals);
                vm.goals = data[i].currGoals;
              };
            }
          });
        });
})();
