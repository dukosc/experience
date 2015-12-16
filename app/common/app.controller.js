(function() {
  "use strict";

  angular.module('experience')
    .controller('MainController', function($scope) {

    }).controller('LoginController', function($http, $location, $scope, $route, $routeParams, LoginService) {
      var vm = this;
      vm.users = [];
      vm.getUsers = function() {
        LoginService.on('all:users', function(data) {
          vm.users = data;
          console.log(data);
        });
      };
      vm.addUser = function(newUser) {
        LoginService.emit('new:user', newUser);
        vm.newUser = "";
      };
      vm.login = function(){
        console.log('fire');
        $location.path('/main-page');
      }
      vm.getUsers();
      LoginService.on('new:user', function(data) {
        var user = {
          username: data.username,
          password: data.password,
        };
        vm.users.push(user);
      });
    });
})();
