(function () {
  "use strict";

  angular
    .module('goals', [
      'ui.bootstrap',
      'ngRoute'
    ])
      .config(function ($routeProvider) {
        $routeProvider
        .when('/goals', {
          templateUrl: 'goals/views/goals.html',
          controller: 'GoalsController'
        })
          .otherwise({ redirectTo: '/404'});
      });


})();
