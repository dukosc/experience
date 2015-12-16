(function () {
  "use strict";

  angular
    .module('goals', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/add-goals', {
        templateUrl: 'app/goals/views/add-goals.html',
        controller: 'GoalsController'
      })
      .when('/view-goals', {
        templateUrl: 'app/goals/views/view-goals.html',
        controller: 'GoalsController'
      })
        .otherwise({ redirectTo: '/404'});
    });


})();
