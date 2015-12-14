(function () {
  "use strict";

  var mainApp = angular.module('experience', ['ngRoute']);

    mainApp.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/login.html',
          controller: 'MainController'
        })
        .when('/main-page', {
          templateUrl: 'views/main-page.html',
          controller: 'MainController'
        })
        .when('/add-goals', {
          templateUrl: 'views/add-goals.html',
          controller: 'MainController'
        })
        .when('/stats', {
          templateUrl: 'views/stats.html',
          controller: 'MainController'
        })
        .when('/game-window', {
          templateUrl: 'views/game-window.html',
          controller: 'GameWindowController'
        })
        .when('/404', {
          templateUrl: 'views/404.html'
        })
        .otherwise({ redirectTo: '/404'});

    });

})();
