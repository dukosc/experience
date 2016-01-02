(function () {
  "use strict";

  angular
  .module('game')
    .controller('GameController', function ($scope, GameService) {
      var vm = this;
      angular.element($('#game-window').show());
      GameService.on('all:users', function(data) {
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
      vm.test = "test";
  });

})();
