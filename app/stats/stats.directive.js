angular.module('stats')
  .directive('playerStats', function() {
    return {
      restrict: 'E',
      templateUrl: 'stats/views/stats.directive.html',
      transclude: true,

      // link: function (scope, element, attrs) {
      //   element.on('click', function () {
      //     alert('yo yo, linking functio');
      //   });
      // }
  };
});
