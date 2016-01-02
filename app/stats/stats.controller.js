(function() {

  angular.module('stats')
    .controller('StatsController', function($scope, StatsService) {
      var vm = this;

      StatsService.on('all:users', function(data) {
        var user = JSON.parse(localStorage.getItem('user'));
        var getGoals = function() {
          for (var i in data) {
            if (user._id === data[i]._id) {
              return data[i].completedGoals;
            };
          }
        }
        var getStats = function() {
          for (var i in data) {
            if (user._id === data[i]._id) {
              return data[i].stats;
            };
          }
        }
        vm.compGoals = getGoals();
        vm.stats = getStats();
        localStorage.setItem('stats', JSON.stringify(vm.stats));

      });
    });

})();
