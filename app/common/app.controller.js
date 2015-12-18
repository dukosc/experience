(function() {
  "use strict";

  angular.module('experience')
    .controller('MainController', function($scope) {

    }).controller('LoginController', function($http, $location, $rootScope, $scope, $route, $routeParams, LoginService) {
      var vm = this;
      vm.x = 0;
      vm.users = [];
      vm.getUsers = function() {
        LoginService.on('all:users', function(data) {
          vm.users = data;
          console.log(data);
        });
      };
      vm.addUser = function(newUser) {
        console.log('fire');
        console.log(newUser);
        LoginService.emit('new:user', newUser);
        vm.newUser = "";
      };
      vm.getUsers();
      console.log(vm.users);
      vm.login = function(user){
        vm.getUsers();
        console.log(user);
        for(var i = 0; i < vm.users.length; i++){
          if(user.username === vm.users[i].username && user.password === vm.users[i].password){
            $rootScope.user = user.username;
            $location.path('/main-page');
          }
          if(user.username === vm.users[i].username && user.password !== vm.users[i].password){
            console.log('wrong password');
          }
          if(user.username !== vm.users[i].username){
            vm.x++;
            vm.getUsers();
            if(vm.x === vm.users.length){
              console.log('users not found');
              vm.x = 0;
            }
          }
        }
      }
      LoginService.on('new:user', function(data) {
        var user = {
          username: data.username,
          password: data.password,
        };
        vm.users.push(user);
      });
    });
})();
