(function () {
    'use strict';

    var dashboardModule = angular.module('ambassadors.dashboardModule');

    dashboardModule.directive('dashboardMissionDirective', ['$state',
      function ($state) {
          return {
              restrict: 'E',
              scope: {
                  mission: '='
              },
              templateUrl: '/Scripts/app/dashboard/views/dashboard_mission_directive.tpl.html',
              link: function (scope, element, attrs) {                  
                  
              }
          };
      }]);
})();