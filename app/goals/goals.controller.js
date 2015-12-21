(function(){

  angular.module('goals')
    .controller('GoalsController', function ($scope, $rootScope, GoalsService) {

      GoalsService.getGoals().success(function (goals) {
        console.log(goals);
        $scope.myGoals = goals;
        console.log($rootScope.user);
        $scope.addGoal = function(newGoal){
          GoalsService.createGoal(newGoal);
        };
  });

})
    .controller('DropdownCtrl', function ($scope, $log) {
      $scope.items = [
          'Example 1',
          'Example 2',
          'Example 3'
      ];

      $scope.status = {
          isopen: false
      };

      $scope.toggled = function(open) {
          $log.log('Dropdown is now: ', open);
      };

      $scope.toggleDropdown = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.status.isopen = !$scope.status.isopen;
      };
});
})();
