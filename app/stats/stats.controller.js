(function(){

  angular.module('stats')
    .controller('StatsController', function ($scope, StatsService) {

      angular.element($('canvas').hide());
      angular.element($('#game-window').hide());

      StatsService.getStats().success(function (stats) {
        console.log(stats);
        $scope.myStats = stats;

        $scope.addStat = function(newStat){
          StatsService.createStat(newStat);
        };
  });

});

})();
