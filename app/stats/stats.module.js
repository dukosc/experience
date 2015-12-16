(function () {
  "use strict";

  angular
    .module('stats', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/stats', {
        templateUrl: 'app/stats/views/stats.html',
        controller: 'StatsController'
      })
        .otherwise({ redirectTo: '/404'});
    });

})();
