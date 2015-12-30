(function () {
  "use strict";

  angular
    .module('stats', [
      'ngRoute',

    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/stats', {
        templateUrl: 'stats/views/stats.html',
        controller: 'StatsController as statCtrl'
      })
        .otherwise({ redirectTo: '/404'});
    });

})();
