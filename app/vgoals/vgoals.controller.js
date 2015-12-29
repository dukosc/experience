(function() {

    angular.module('vgoals')
      .controller('ViewGoalsController', function($scope, $route, $rootScope, ViewGoalsService) {
          var vm = this;
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
          $rootScope.$on('$routeChangeSuccess', function() {
    $route.reload();
});
          console.log(vm);
        });
})();
