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
        templateUrl: 'goals/views/view-goals.html',
        controller: 'GoalsController as goalCtrl'
      })
        .otherwise({ redirectTo: '/404'});
    });



})();
