(function() {
    "use strict";
    angular.module('goals').directive('viewGoals', function() {
        return {
            restrict: 'EA',
            templateUrl: 'goals/views/goals.directive.html',
            transclude: true,

            link: function (scope, element, attrs) {
              element.on('click', function(){
                alert('this is a test');
              });
        },
        scope: {
          goals: '=',
          action: '&',
        }
      }
    });
})();
