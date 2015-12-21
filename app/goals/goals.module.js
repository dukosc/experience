(function () {
  "use strict";

  angular
    .module('goals', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/goals', {
        templateUrl: 'goals/views/goals.html',
        controller: 'GoalsController as goalCtrl'
      })
        .otherwise({ redirectTo: '/404'});
    });


})();
