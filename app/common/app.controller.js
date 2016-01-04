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
        });
      };
      vm.addUser = function(newUser) {
        LoginService.emit('new:user', newUser);
        location.reload();
      };
      vm.login = function(user){
        vm.getUsers();
        for(var i = 0; i < vm.users.length; i++){
          if(user.username === vm.users[i].username && user.password === vm.users[i].password){
            localStorage.setItem('user', JSON.stringify(vm.users[i]));
            localStorage.setItem('stats', JSON.stringify(vm.users[i].stats));
            var user = localStorage.getItem('user');
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
          // stats: {
          //   strength: 10,
          //   endurance: 10,
          //   dexterity: 10,
          //   intelligence: 10,
          //   wisdom: 10
          // },
          // currGoals: [],
          // completedGoals: []
        };
        vm.users.push(user);
      });
    });
})();
