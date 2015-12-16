(function () {
  "use strict";

  angular
    .module('goals', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/add-goals', {
        templateUrl: 'goals/views/add-goals.html',
        controller: 'GoalsController'
      })
      .when('/view-goals', {
        templateUrl: 'goals/views/view-goals.html',
        controller: 'GoalsController'
      })
        .otherwise({ redirectTo: '/404'});
    });


})();
