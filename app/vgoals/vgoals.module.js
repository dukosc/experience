(function () {
  "use strict";

  angular
    .module('vgoals', [
      'ui.bootstrap',
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/view-goals', {
        templateUrl: 'vgoals/views/view-goals.html',
        controller: 'ViewGoalsController as viewGoalCtrl'
      })
        .otherwise({ redirectTo: '/404'});
    });



})();
