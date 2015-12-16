(function () {
  "use strict";

  angular
    .module('experience', [
      'ngRoute',
      'underscore',
      'experience',
      'goals',
      'game',
      'stats'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'app/common/views/login.html',
        controller: 'MainController'
      })
      .when('/main-page', {
        templateUrl: 'app/common/views/main-page.html',
        controller: 'MainController'
      })
        .when('/404', {
          templateUrl: 'app/common/views/404.html'
        })
        .otherwise({ redirectTo: '/404'});
    });

  angular
    .module('underscore', [])
    .factory('_', function($window){
      return $window._;
    });
    angular
    .module('jquery', [])
    .factory('$', function($window){
      return $window.$;
    });
})();
