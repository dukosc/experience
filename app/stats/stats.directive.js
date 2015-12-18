angular.module('stats')
  .directive('playerStats', function() {
    return {
      restrict: 'E',
      template: '<h2>{{character.name}}</h2> <h2>Strength: {{strength.stat}}</h2> <h2>Stamina: {{stamina.stat}} </h2> <h2>Intellect: {{intellect.stat}}</h2> <h2>Wisdom: {{wisdom.stat}} </h2> <h2>Dexterity: {{dexterity.stat}} </h2><a href="#" ng-transclude></a>',
      transclude: true,

      // link: function (scope, element, attrs) {
      //   element.on('click', function () {
      //     alert('yo yo, linking functio');
      //   });
      // }
  };
});
